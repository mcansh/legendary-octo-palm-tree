import type { DataFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import slugify from "slugify";
import { zfd } from "zod-form-data";

import { prisma } from "~/db.server";

let schema = zfd.formData({ name: zfd.text() });

export async function action({ request }: DataFunctionArgs) {
  let url = new URL(request.url);
  let formData = new URLSearchParams(await request.text());
  let data = schema.parse(formData);

  let slug = slugify(data.name, { lower: true });

  let tenant = await prisma.tenant.create({ data: { name: data.name, slug } });

  return redirect(`${url.protocol}//${tenant.slug}.localhost:3000`);
}

export default function JoinPage() {
  return (
    <Form method="post">
      <label>
        <span>Salon Name</span>
        <input type="text" name="name" />
      </label>
    </Form>
  );
}
