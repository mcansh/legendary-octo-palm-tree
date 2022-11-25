import { unstable_parseMultipartFormData } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";

import type { SalonDataFunctionArgs } from "~/db.server";
import invariant from "~/invariant";
import {
  getTenant,
  getTenantSlug,
  updateTenant,
  uploadImageToCloudflare,
} from "~/utils.server";

export async function loader({ request, context }: SalonDataFunctionArgs) {
  let slug = getTenantSlug(request);
  let tenant = await getTenant(slug, context);

  if (!tenant) {
    throw new Response("Tenant not found", { status: 404 });
  }

  return { tenant };
}

export async function action({ request, context }: SalonDataFunctionArgs) {
  let slug = getTenantSlug(request);
  let tenant = await getTenant(slug, context);

  if (!tenant) {
    throw new Response("Tenant not found", { status: 404 });
  }

  let formData = await request.formData();

  let name = formData.get("name");
  let image = formData.get("image");

  if (typeof name !== "string") {
    throw new Response("Invalid name", { status: 400 });
  }

  let imageUrl = await uploadImageToCloudflare(image, context);

  await updateTenant(context, slug, {
    name,
    images: imageUrl ? [{ url: imageUrl, alt: "" }] : [],
  });

  return redirect(`/admin`);
}

export default function Admin() {
  let data = useLoaderData<typeof loader>();
  return (
    <Form
      method="post"
      encType="multipart/form-data"
      className="flex flex-col gap-4"
    >
      <label>
        Name
        <input name="name" type="text" defaultValue={data.tenant.name} />
      </label>

      <label>
        Image
        <input name="image" type="file" />
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
