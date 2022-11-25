import type { DataFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { authenticator } from "~/auth.server";

export async function loader({ request }: DataFunctionArgs) {
  return await authenticator.isAuthenticated(request, { successRedirect: "/" });
}

export async function action({ request }: DataFunctionArgs) {
  return await authenticator.authenticate("form", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
}

export default function JoinPage() {
  return (
    <Form method="post" replace className="flex flex-col space-y-4">
      <label>
        <span>Email</span>
        <input type="email" name="email" />
      </label>

      <label>
        <span>Password</span>
        <input type="password" name="password" />
      </label>

      <label>
        <span>First Name</span>
        <input type="text" name="given_name" />
      </label>

      <label>
        <span>Last Name</span>
        <input type="text" name="family_name" />
      </label>

      <button type="submit" name="intent" value="register">
        Join
      </button>
    </Form>
  );
}
