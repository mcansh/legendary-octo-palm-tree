import type { Prisma } from "@prisma/client";

import { prisma } from "./db.server";

export function getTenantSlug(request: Request) {
  let url = new URL(request.url);
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