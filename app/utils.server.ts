import type { Prisma } from "@prisma/client";

import { prisma } from "./db.server";

export function getTenantSlug(request: Request) {
  let url = new URL(request.url);
  console.log(process.env.NODE_ENV);

  if (process.env.NODE_ENV !== "production") {
    let slug = url.searchParams.get("slug");
    return slug || "tenant1";
  }

  return url.hostname.split(".")[0];
}

export function getTenant(tenantSlug: string) {
  return prisma.tenant.findUnique({
    where: { slug: tenantSlug },
    include: { images: true },
  });
}

export async function updateTenant(
  tenant: string,
  data: Prisma.TenantUpdateInput
) {
  return prisma.tenant.update({
    where: { slug: tenant },
    data,
  });
}
