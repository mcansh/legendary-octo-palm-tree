import type { DataFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { requireUser } from "~/session.server";
import { createTenantUrl } from "~/utils.server";

export async function loader({ request, params }: DataFunctionArgs) {
  if (!params.slug) throw new Error("missing tenant slug");
  await requireUser(request);
  return redirect(createTenantUrl(request, params.slug));
}
