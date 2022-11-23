import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import slugify from "slugify";
import { prisma } from "~/db.server";

export async function action({ request }: ActionArgs) {
  let url = new URL(request.url);
  const formData = new URLSearchParams(await request.text());
  const name = formData.get("name");
  if (typeof name !== "string") {
    throw new Response("Invalid name", { status: 400 });
  }

  const slug = slugify(name, { lower: true });

  let tenant = await prisma.tenant.create({
    data: {
      name,
      slug,
    },
  });

  if (process.env.NODE_ENV === "development") {
    let search = new URLSearchParams({ tenantId: tenant.id }).toString();
    return redirect(`?${search}`);
  }

  return redirect(`https://${tenant.slug}.${url.host}`);
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
