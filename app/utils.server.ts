import type { Prisma, User } from "@prisma/client";

import { prisma } from "./db.server";

export function getTenantSlug(request: Request) {
  let url = new URL(request.url);
  return url.hostname.split(".")[0];
}

export async function getTenant(slug: string, user?: User) {
  if (user) {
    let tenants = await prisma.tenant.findMany({
      where: {
        slug,
        users: { some: { id: user.id } },
      },
    });

    let tenant = tenants.at(0);

    if (!tenant) {
      throw new Response(`Not authorized`, {
        status: 403,
        statusText: "Forbidden",
      });
    }
  }

  return prisma.tenant.findUnique({
    where: { slug },
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
