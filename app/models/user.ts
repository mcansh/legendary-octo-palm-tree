import type { User } from "@prisma/client";
import type { Password } from "@prisma/client";

import { hash, verify } from "~/auth.server";
import { prisma } from "~/db.server";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser({
  email,
  password,
  familyName,
  givenName,
}: {
  email: User["email"];
  password: string;
  givenName: User["given_name"];
  familyName: User["family_name"];
}) {
  let hashedPassword = await hash(password);

  return prisma.user.create({
    data: {
      email,
      given_name: givenName,
      family_name: familyName,
      password: { create: { hash: hashedPassword } },
    },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"]
) {
  let userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: { password: true },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  let isValid = await verify(password, userWithPassword.password.hash);

  if (!isValid) return null;

  let { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
