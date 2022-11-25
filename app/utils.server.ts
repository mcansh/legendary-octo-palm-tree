import { uuid } from "@cfworker/uuid";
import type { RequireAtLeastOne } from "type-fest";

import type { SalonContext } from "./db.server";
import { db } from "./db.server";

export function getTenantSlug(request: Request) {
  let url = new URL(request.url);
  return url.hostname.split(".")[0];
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
}

export interface TenantWithImage extends Tenant {
  images: Array<TenantImage>;
}

export interface TenantImage {
  id: string;
  alt: string;
  url: string;
}

export async function getTenant(
  slug: string,
  context: SalonContext
): Promise<Tenant | undefined> {
  let { results: tenant } = await db(context).fetchOne({
    tableName: "Tenant",
    fields: "*",
    where: {
      conditions: "slug = ?1",
      params: [slug],
    },
  });

  if (!tenant) return undefined;

  let { results: images } = await db(context).fetchAll({
    tableName: "Image",
    fields: "*",
    where: {
      conditions: "tenantId = ?1",
      params: [tenant.id],
    },
  });

  return { ...tenant, images } as unknown as Tenant;
}

export async function updateTenant(
  context: SalonContext,
  slug: string,
  updates: RequireAtLeastOne<
    Partial<Tenant & { images: Array<{ url: string; alt?: string }> }>
  >
) {
  let { images, ...data } = updates;

  let qb = db(context);
  let tenantUpdateResult = await qb.update({
    tableName: "Tenant",
    data,
    where: {
      conditions: "slug = ?1",
      params: [slug],
    },
  });

  if (!tenantUpdateResult.success || !tenantUpdateResult.results) {
    throw new Error("Could not update tenant");
  }

  if (!tenantUpdateResult.success) {
    throw new Error("Could not find tenant");
  }

  if (images) {
    await Promise.all(
      images.map(async (image) => {
        let { results, success } = await qb.insert({
          tableName: "Image",
          data: {
            url: image.url,
            alt: image.alt ?? "",
            id: uuid(),
            tenantId: tenantUpdateResult.results![0].id,
          },
        });

        if (!success) {
          console.error(`Failed to insert image`, results);
        }
      })
    );
  }
}

interface CloudflareImageUploadResponse {
  result: {
    id: string;
    filename: string;
    uploaded: string;
    requireSignedURLs: boolean;
    variants: Array<string>;
  };
  success: boolean;
  errors: [];
  messages: [];
}

export async function uploadImageToCloudflare(
  image: FormDataEntryValue | null,
  context: SalonContext
) {
  if (!image || !(image instanceof File) || image.size === 0) return undefined;

  let imageFormData = new FormData();
  imageFormData.append("file", image);

  let promise = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${context.CF_IMAGES_ACCOUNT_ID}/images/v1`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${context.CF_IMAGES_API_TOKEN}`,
      },
      body: imageFormData,
    }
  );

  let response = (await promise.json()) as CloudflareImageUploadResponse;

  if (!response.success) {
    console.error(response.errors);
    throw new Error(`Upload failed`);
  }

  console.log(response);

  return `https://imagedelivery.net/4rZPXkumxxof9eZr-MhO7g/${response.result.id}/desktop`;
}
