import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "admin_session";
const SESSION_DURATION = 60 * 60 * 8; // 8 heures

export type AdminSession = {
  adminId: string;
  name: string;
  email: string;
};

function getSecret() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("La variable AUTH_SECRET est manquante.");
  }

  return new TextEncoder().encode(secret);
}

export async function createAdminSession(session: AdminSession) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION * 1000);

  const token = await new SignJWT({
    adminId: session.adminId,
    name: session.name,
    email: session.email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(getSecret());

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: expiresAt,
  });
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getSecret());

    if (
      typeof payload.adminId !== "string" ||
      typeof payload.name !== "string" ||
      typeof payload.email !== "string"
    ) {
      return null;
    }

    return {
      adminId: payload.adminId,
      name: payload.name,
      email: payload.email,
    };
  } catch {
    return null;
  }
}

export async function deleteAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function requireAdminSession(): Promise<AdminSession> {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/connexion");
  }

  return session;
}
