import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import db from "@/lib/prisma.server";
import argon2 from "argon2";

import { sessionStorage } from "@/lib/session.server";
import { User } from "@prisma/client";

export let authenticator = new Authenticator<User>(sessionStorage);

const loginStrategy = new FormStrategy(async ({ form }) => {
  console.log("Form", form);

  const email = form.get("email") as string;
  const password = form.get("password") as string;
  console.log("Email", email);
  console.log("Password", password);

  const user = await db.user.findFirst({ where: { email } });

  if (!user) {
    console.log("User not found");
    throw new AuthorizationError();
  }

  if (!(await argon2.verify(user.password, password))) {
    console.log("Password not matched");
    throw new AuthorizationError();
  }

  return user;
});

authenticator.use(loginStrategy, "user-login");
