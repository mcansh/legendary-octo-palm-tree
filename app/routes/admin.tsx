import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
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

  let formData = await request.formData();
  let name = formData.get("name");

  await updateTenant(tenantId, { name });

  return redirect(`/admin`);
}

export default function Admin() {
  return (
    <Form method="post">
      <label>
        Name
        <input name="name" />
      </label>
      <button type="submit">Update</button>
    </Form>
  );
}
