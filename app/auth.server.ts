import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import type { User } from "@prisma/client";
import { zfd } from "zod-form-data";
import { z } from "zod";
import { hash, verify } from "@node-rs/bcrypt";

import { sessionStorage } from "~/session.server";

import { prisma } from "./db.server";

export let authenticator = new Authenticator<
  User & { tenants: Array<{ slug: string }> }
>(sessionStorage);

let register = zfd.formData({
  email: zfd.text(z.string().email()),
  password: zfd.text(z.string().min(8)),
  given_name: zfd.text(),
  family_name: zfd.text(),
});

let login = zfd.formData({
  email: zfd.text(z.string().email()),
  password: zfd.text(z.string().min(8)),
});

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let intent = form.get("intent");

    if (intent === "register") {
      let result = register.safeParse(form);

      if (!result.success) {
        console.error(result.error.formErrors.fieldErrors);
        throw new Error("Invalid form data");
      }

      let hashedPassword = await hash(result.data.password);

      let user = await prisma.user.create({
        data: {
          email: result.data.email,
          given_name: result.data.given_name,
          family_name: result.data.family_name,
          password: { create: { hash: hashedPassword } },
        },
        include: { tenants: { select: { slug: true } } },
      });

      return user;
    }

    let result = login.safeParse(form);

    if (!result.success) {
      console.error(result.error.formErrors.fieldErrors);
      throw new Error("Invalid form data");
    }

    let user = await prisma.user.findUnique({
      where: { email: result.data.email },
      include: { password: true, tenants: { select: { slug: true } } },
    });

    if (!user) throw new Error("Invalid credentials");

    let valid = await verify(result.data.password, user.password!.hash);

    if (!valid) throw new Error("Invalid credentials");

    return user;
  })
);
