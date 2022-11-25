import type { DataFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { unstable_createMemoryUploadHandler } from "@remix-run/node";
import { unstable_composeUploadHandlers } from "@remix-run/node";
import { unstable_parseMultipartFormData } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { zfd } from "zod-form-data";
import cuid from "cuid";

import { uploadImageToCloudinary } from "~/upload.server";
import { getTenant, getTenantSlug, updateTenant } from "~/utils.server";

export async function loader({ request }: DataFunctionArgs) {
  let slug = getTenantSlug(request);
  let tenant = await getTenant(slug);

  if (!tenant) {
    throw new Response("Tenant not found", { status: 404 });
  }

  return { tenant };
}

const schema = zfd
  .formData({
    name: zfd.text(z.string().min(1)),
    image: zfd.text(z.string().url().optional()),
    imageAltText: zfd.text(z.string().optional()),
  })
  .refine((data) => {
    if (data.image && data.imageAltText) {
      return {
        path: ["imageAltText"],
        message: "Image alt text is required when an image is provided",
      };
    }
  });

export async function action({ request }: DataFunctionArgs) {
  let slug = getTenantSlug(request);
  let tenant = await getTenant(slug);

  if (!tenant) {
    throw new Response("Tenant not found", { status: 404 });
  }

  let uploadHandler = unstable_composeUploadHandlers(
    // our custom upload handler
    async ({ name, data }) => {
      if (name !== "image") return undefined;
      let public_id = `${slug}/${cuid()}`;
      let uploadedImage = await uploadImageToCloudinary(data, { public_id });
      return uploadedImage.secure_url;
    },
    // fallback to memory for everything else
    unstable_createMemoryUploadHandler()
  );

  let formData = await unstable_parseMultipartFormData(request, uploadHandler);

  let result = schema.safeParse(formData);

  if (!result.success) {
    console.log(result.error);

    return json(
      { errors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  await updateTenant(slug, {
    name: result.data.name,
    images: {
      create: result.data.image
        ? { url: result.data.image, alt: "my file" }
        : undefined,
    },
  });

  return redirect(`/admin`);
}

export default function Admin() {
  let data = useLoaderData<typeof loader>();
  let actionData = useActionData<typeof action>();

  return (
    <Form
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
          aria-invalid={Boolean(actionData?.errors.name)}
          aria-describedby={actionData?.errors.name ? "name-error" : undefined}
        />
        {actionData?.errors.name ? (
          <span className="text-red-500" id="name-error">
            {actionData.errors.name}
          </span>
        ) : null}
      </label>

      <label className="space-x-2">
        <span>Image</span>
        <input
          name="image"
          type="file"
          aria-invalid={Boolean(actionData?.errors.image)}
          aria-describedby={
            actionData?.errors.image ? "image-error" : undefined
          }
        />
        {actionData?.errors.image ? (
          <span className="text-red-500" id="image-error">
            {actionData.errors.image}
          </span>
        ) : null}
      </label>

      <label className="space-x-2">
        <span>Image Alt Text</span>
        <input
          name="imageAltText"
          type="text"
          aria-invalid={Boolean(actionData?.errors.imageAltText)}
          aria-describedby={
            actionData?.errors.imageAltText ? "imageAltText-error" : undefined
          }
        />
        {actionData?.errors.imageAltText ? (
          <span className="text-red-500" id="imageAltText-error">
            {actionData.errors.imageAltText}
          </span>
        ) : null}
      </label>

      <button
        className="w-max bg-indigo-500 text-white px-4 py-2 rounded-md"
        type="submit"
      >
        Update
      </button>
    </Form>
  );
}
