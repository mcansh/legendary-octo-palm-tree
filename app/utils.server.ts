import type { Prisma } from "@prisma/client";
import { prisma } from "./db.server";

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
