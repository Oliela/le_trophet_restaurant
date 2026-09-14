import "dotenv/config";
import { hash } from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DIRECT_URL;

if (!connectionString) {
  throw new Error("La variable DIRECT_URL est manquante.");
}

const requiredVariables = [
  "ADMIN_ONE_NAME",
  "ADMIN_ONE_EMAIL",
  "ADMIN_ONE_PASSWORD",
  "ADMIN_TWO_NAME",
  "ADMIN_TWO_EMAIL",
  "ADMIN_TWO_PASSWORD",
] as const;

for (const variable of requiredVariables) {
  if (!process.env[variable]) {
    throw new Error(`La variable ${variable} est manquante.`);
  }
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const admins = [
  {
    name: process.env.ADMIN_ONE_NAME!,
    email: process.env.ADMIN_ONE_EMAIL!.trim().toLowerCase(),
    password: process.env.ADMIN_ONE_PASSWORD!,
  },
  {
    name: process.env.ADMIN_TWO_NAME!,
    email: process.env.ADMIN_TWO_EMAIL!.trim().toLowerCase(),
    password: process.env.ADMIN_TWO_PASSWORD!,
  },
];

async function main() {
  for (const admin of admins) {
    const passwordHash = await hash(admin.password, 12);

    await prisma.admin.upsert({
      where: { email: admin.email },
      update: {
        name: admin.name,
        passwordHash,
      },
      create: {
        name: admin.name,
        email: admin.email,
        passwordHash,
      },
    });
  }

  console.log("Les deux administrateurs ont été créés.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });