import type { DataFunctionArgs } from "@remix-run/node";
import { json , redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import slugify from "slugify";
import { zfd } from "zod-form-data";

import { prisma } from "~/db.server";
import { requireUser } from "~/session.server";
import { createTenantUrl } from "~/utils.server";

export async function loader({ request }: DataFunctionArgs) {
  await requireUser(request);
  return json({});
}

let schema = zfd.formData({ name: zfd.text() });

export async function action({ request }: DataFunctionArgs) {
  let formData = new URLSearchParams(await request.text());
  let data = schema.parse(formData);

  let slug = slugify(data.name, { lower: true });

  let tenant = await prisma.tenant.create({ data: { name: data.name, slug } });

  return redirect(createTenantUrl(request, tenant.slug));
}

export default function CreateATenant() {
  return (
    <Form method="post" replace>
      <label className="space-x-2">
        <span>Salon Name</span>
        <input type="text" name="name" />
      </label>
    </Form>
  );
}
