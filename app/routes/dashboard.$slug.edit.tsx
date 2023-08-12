import type { DataFunctionArgs } from "@remix-run/node";
import {
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
 unstable_composeUploadHandlers , json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import cuid from "cuid";
import { z } from "zod";
import { zfd } from "zod-form-data";

import { prisma } from "~/db.server";
import { getTenantBySlug, updateTenant } from "~/models/tenant";
import { requireUser } from "~/session.server";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "~/upload.server";
import { rootDomainOnly, buildImageUrl } from "~/utils.server";

export async function loader({ request, params }: DataFunctionArgs) {
  await requireUser(request);

  if (!params.slug) throw new Error("missing tenant slug");

  // only allow this route on the root domain
  rootDomainOnly(request);

  let tenant = await getTenantBySlug(params.slug);

  if (!tenant) {
    throw notFound(`Tenant ${params.slug} not found`);
  }

  return json({
    tenant: {
      ...tenant,
      images: tenant.images.map((image) => {
        return {
          ...image,
          url: buildImageUrl(image.public_id, {
            transformations: { resize: { width: 400, height: 400 } },
          }),
        };
      }),
    },
  });
}

const schema = zfd.formData(
  z
    .object({
      name: zfd.text(z.string().optional()),
      image: zfd.text(z.string().optional()),
      imageAltText: zfd.text(z.string().optional()),
    })
    .refine((data) => {
      if (data.image && !data.imageAltText) {
        return {
          path: ["imageAltText"],
          message: "Image alt text is required when an image is provided",
        };
      }
    })
);

export async function action({ request, params }: DataFunctionArgs) {
  if (!params.slug) throw new Error("missing tenant slug");
  let tenant = await getTenantBySlug(params.slug);

  if (!tenant) {
    throw json("Tenant not found", {
      status: 404,
      statusText: "Not Found",
    });
  }

  let uploadHandler = unstable_composeUploadHandlers(
    // our custom upload handler
    async ({ name, data }) => {
      if (name !== "image") return "";
      let public_id = `${params.slug}/${cuid()}`;
      let uploadedImage = await uploadImageToCloudinary(data, { public_id });
      if (!uploadedImage) {
        console.log(`no image uploaded for ${name}`);
        return "";
      }
      return uploadedImage.public_id;
    },
    // fallback to memory for everything else
    unstable_createMemoryUploadHandler()
  );

  let formData = await unstable_parseMultipartFormData(request, uploadHandler);

  let intent = formData.get("intent");

  if (intent === "delete-image") {
    let deleted = await prisma.image.delete({
      where: {
        id: formData.get("imageId") as string,
      },
    });

    await deleteImageFromCloudinary(deleted.public_id);

    return json({ errors: null });
  }

  let result = schema.safeParse(formData);

  if (!result.success) {
    console.log(result.error.formErrors.fieldErrors);

    return json(
      { errors: result.error.formErrors.fieldErrors },
      { status: 400 }
    );
  }

  await updateTenant(params.slug, {
    name: result.data.name,
    images: {
      create:
        result.data.image && result.data.imageAltText
          ? {
              alt: result.data.imageAltText,
              public_id: result.data.image,
            }
          : undefined,
    },
  });

  return json({ errors: null });
}

export default function Dashboard() {
  let data = useLoaderData<typeof loader>();
  let fetcher = useFetcher<typeof action>();

  return (
    <div className="mx-8 my-4">
      <h1 className="text-2xl">Manage {data.tenant.name}</h1>
      <fetcher.Form
        method="post"
        encType="multipart/form-data"
        className="flex flex-col space-y-4"
      >
        <label className="space-x-2">
          <span>Name</span>
          <input
            name="name"
            type="text"
            defaultValue={data.tenant.name}
            aria-invalid={Boolean(fetcher.data?.errors?.name)}
            aria-describedby={
              fetcher.data?.errors?.name ? "name-error" : undefined
            }
          />
          {fetcher.data?.errors?.name ? (
            <ErrorMessages errors={fetcher.data.errors.name} id="name-error" />
          ) : null}
        </label>

        <label className="space-x-2">
          <span>Image</span>
          <input
            name="image"
            type="file"
            aria-invalid={Boolean(fetcher.data?.errors?.image)}
            aria-describedby={
              fetcher.data?.errors?.image ? "image-error" : undefined
            }
          />
          {fetcher.data?.errors?.image ? (
            <ErrorMessages
              errors={fetcher.data.errors.image}
              id="image-error"
            />
          ) : null}
        </label>

        <label className="space-x-2">
          <span>Image Alt Text</span>
          <input
            name="imageAltText"
            type="text"
            aria-invalid={Boolean(fetcher.data?.errors?.imageAltText)}
            aria-describedby={
              fetcher.data?.errors?.imageAltText
                ? "imageAltText-error"
                : undefined
            }
          />
          {fetcher.data?.errors?.imageAltText ? (
            <ErrorMessages
              errors={fetcher.data.errors.imageAltText}
              id="imageAltText-error"
            />
          ) : null}
        </label>

        <button
          className="w-max bg-indigo-500 text-white px-4 py-2 rounded-md"
          type="submit"
        >
          Update
        </button>
      </fetcher.Form>

      {data.tenant.images.map((image) => {
        return (
          <div key={image.id}>
            <img src={image.url} alt={image.alt} />
            <fetcher.Form method="post" encType="multipart/form-data">
              <input type="hidden" name="imageId" value={image.id} />
              <button type="submit" name="intent" value="delete-image">
                Delete
              </button>
            </fetcher.Form>
          </div>
        );
      })}
    </div>
  );
}

function ErrorMessages({ errors, id }: { errors: Array<string>; id: string }) {
  return (
    <ul className="text-red-500 list-disc pl-4" id={id}>
      {errors.map((error) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  );
}
