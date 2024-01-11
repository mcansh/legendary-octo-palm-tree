import type { Prisma, Tenant, User } from "@prisma/client";

import { prisma } from "~/db.server";

export function getTenantSlug(request: Request): string {
  let url = new URL(request.url);
  let slug = url.hostname.split(".")[0];
  if (!slug) throw new Error("No tenant slug found");
  return slug;
}

export async function getTenantById(id: Tenant["id"]) {
  return prisma.tenant.findUnique({
    where: { id },
    include: { images: true },
  });
}

export async function getTenantBySlug(slug: Tenant["slug"]) {
  return prisma.tenant.findUnique({
    where: { slug },
    include: { images: true },
  });
}

export async function createTenant({
  slug,
  name,
  userId,
}: {
  slug: Tenant["slug"];
  name: Tenant["name"];
  userId: User["id"];
}) {
  return prisma.tenant.create({
    data: {
      slug,
      name,
      users: { connect: { id: userId } },
    },
    include: { images: true },
  });
}

export async function deleteTenantBySlug(slug: Tenant["slug"]) {
  return prisma.tenant.delete({ where: { slug } });
}

export async function getTenantsByUserId(userId: User["id"]) {
  return prisma.tenant.findMany({
    where: { users: { some: { id: userId } } },
  });
}

export async function doesUserBelongToTenant(
  userId?: User["id"],
  tenantId?: Tenant["id"],
) {
  if (!userId || !tenantId) return false;
  let count = await prisma.tenant.count({
    where: { id: tenantId, users: { some: { id: userId } } },
  });
  return count > 0;
}

export async function updateTenant(
  tenant: string,
  data: Prisma.TenantUpdateInput,
) {
  return prisma.tenant.update({
    where: { slug: tenant },
    data,
  });
}
