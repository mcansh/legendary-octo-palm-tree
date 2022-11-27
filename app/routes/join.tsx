import type { DataFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import clsx from "clsx";
import { z } from "zod";
import { zfd } from "zod-form-data";

import type { RouteHandle } from "~/matches";
import { createUser, getUserByEmail } from "~/models/user";
import { createUserSession, getUserId } from "~/session.server";
import { getReturnTo } from "~/utils.server";

let joinSchema = zfd.formData({
  email: zfd.text(z.string().email()),
  password: zfd.text(
    z.string().min(8, "Password must be at least 8 characters")
  ),
  given_name: zfd.text(z.string().min(1).default("Logan")),
  family_name: zfd.text(z.string().min(1).default("McAnsh")),
});

export async function loader({ request }: DataFunctionArgs) {
  let userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

export async function action({ request }: DataFunctionArgs) {
  let formData = await request.formData();
  let result = joinSchema.safeParse(formData);
  if (!result.success) {
    console.error(result.error);
    return json({ errors: result.error.formErrors.fieldErrors }, 422);
  }

  let existingUser = await getUserByEmail(result.data.email);
  if (existingUser) {
    return json({ errors: { email: "Email already taken" } }, 422);
  }

  let user = await createUser({
    email: result.data.email,
    password: result.data.password,
    givenName: result.data.given_name,
    familyName: result.data.family_name,
  });

  return createUserSession({
    request,
    redirectTo: getReturnTo(new URL(request.url).searchParams),
    remember: false,
    userId: user.id,
  });
}

export const handle: RouteHandle = {
  bodyClassName: "bg-gray-50",
};

export default function JoinPage() {
  let actionData = useActionData<typeof action>();
  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Form className="space-y-6" method="post">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={clsx(
                      "block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm",
                      actionData?.errors.email
                        ? "border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                    )}
                    aria-invalid="true"
                    aria-describedby="email-error"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {/* <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    /> */}
                  </div>
                  {actionData?.errors.email ? (
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {actionData.errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className={clsx(
                      "block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm",
                      actionData?.errors.email
                        ? "border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                    )}
                    aria-invalid="true"
                    aria-describedby="password-error"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {/* <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    /> */}
                  </div>
                </div>
                {actionData?.errors?.password ? (
                  <p className="mt-2 text-sm text-red-600" id="password-error">
                    {actionData.errors.password}
                  </p>
                ) : null}
              </div>

              <div>
                <button
                  name="intent"
                  value="register"
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Register
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
