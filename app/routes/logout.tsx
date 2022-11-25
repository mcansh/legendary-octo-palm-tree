import type { DataFunctionArgs } from "@remix-run/node";

import { authenticator } from "~/auth.server";

export async function action({ request }: DataFunctionArgs) {
  await authenticator.logout(request, { redirectTo: "/login" });
}
