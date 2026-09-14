"use server";

import { compare } from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_DURATION_MINUTES = 15;

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export type LoginState = {
  error?: string;
};

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const result = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return {
      error:
        "Veuillez renseigner un email et un mot de passe valides.",
    };
  }

  const email = result.data.email.toLowerCase();

  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    return {
      error: "Email ou mot de passe incorrect.",
    };
  }

  const now = new Date();

  if (admin.lockedUntil && admin.lockedUntil > now) {
    return {
      error:
        "Trop de tentatives. Réessayez dans quelques minutes.",
    };
  }

  const passwordIsValid = await compare(
    result.data.password,
    admin.passwordHash,
  );

  if (!passwordIsValid) {
    const failedAttempts = admin.failedLoginAttempts + 1;

    if (failedAttempts >= MAX_LOGIN_ATTEMPTS) {
      const lockedUntil = new Date(
        now.getTime() +
          LOCK_DURATION_MINUTES * 60 * 1000,
      );

      await prisma.admin.update({
        where: { id: admin.id },
        data: {
          failedLoginAttempts: 0,
          lockedUntil,
        },
      });

      return {
        error:
          "Trop de tentatives. Réessayez dans 15 minutes.",
      };
    }

    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        failedLoginAttempts: failedAttempts,
        lockedUntil: null,
      },
    });

    return {
      error: "Email ou mot de passe incorrect.",
    };
  }

  await prisma.admin.update({
    where: { id: admin.id },
    data: {
      failedLoginAttempts: 0,
      lockedUntil: null,
    },
  });

  await createAdminSession({
    adminId: admin.id,
    name: admin.name,
    email: admin.email,
  });

  redirect("/admin");
}