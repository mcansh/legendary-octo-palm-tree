import type { DataFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { requireUser } from "~/session.server";

export async function loader({ request, params }: DataFunctionArgs) {
  if (!params.slug) throw new Error("missing tenant slug");
  await requireUser(request);
  let url = new URL(request.url);

  // only allow this route on the root domain
  // rootDomainOnly(request, "/dashboard/" + tenant + "/edit");
  return redirect(`${url.protocol}//${params.slug}.localhost:3000`);
}
