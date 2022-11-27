import type { DataFunctionArgs } from "@remix-run/node";

import { getTenantSlug } from "~/models/tenant";
import { requireUser } from "~/session.server";
import { rootDomainOnly } from "~/utils.server";

export async function loader({ request }: DataFunctionArgs) {
  await requireUser(request);
  let tenant = getTenantSlug(request);

  // only allow this route on the root domain
  rootDomainOnly(request, "/dashboard/" + tenant + "/edit");
}
