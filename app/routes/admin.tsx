import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { unstable_parseMultipartFormData } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { uploadHandler } from "~/upload.server";
import { getTenant, updateTenant } from "~/utils.server";

export async function loader({ request }: LoaderArgs) {
  let { hostname } = new URL(request.url);
  let tenantId = hostname.split(".")[0];
  let tenant = await getTenant(tenantId);

  if (!tenant) {
    throw new Response("Tenant not found", { status: 404 });
  }

  return { tenant };
}

export async function action({ request }: ActionArgs) {
  let { hostname } = new URL(request.url);
  let tenantId = hostname.split(".")[0];
  let tenant = await getTenant(tenantId);

  if (!tenant) {
    throw new Response("Tenant not found", { status: 404 });
  }

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  let name = formData.get("name");
  let image = formData.get("image");

  if (typeof name !== "string") {
    throw new Response("Invalid name", { status: 400 });
  }

  if (typeof image === "string") {
    throw new Response("Invalid image", { status: 400 });
  }

  console.log({ image });

  await updateTenant(tenantId, {
    name,
    images: {
      create: image
        ? {
            url: `/uploads/${image.name}`,
            alt: image.name,
          }
        : undefined,
    },
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
