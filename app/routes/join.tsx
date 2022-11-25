import { redirect } from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";
import slugify from "slugify";
import { uuid } from "@cfworker/uuid";

import type { SalonDataFunctionArgs } from "~/db.server";
import { db } from "~/db.server";
import invariant from "~/invariant";

export async function action({ request, context }: SalonDataFunctionArgs) {
  let url = new URL(request.url);
  let formData = new URLSearchParams(await request.text());
  let name = formData.get("name");

  if (typeof name !== "string") {
    throw new Response("Invalid name", { status: 400 });
  }

  let slug = slugify(name, { lower: true });

  let { results, success } = await db(context).insert({
    tableName: "Tenant",
    data: {
      name,
      slug,
      id: uuid(),
    },
    returning: "*",
  });

  console.log({ results, success });

  invariant(
    success && results,
    "Tenant was not registered; an error has occurred."
  );

  // if (process.env.NODE_ENV === "development") {
  //   let search = new URLSearchParams({ tenantId: tenant.id }).toString();
  //   return redirect(`?${search}`);
  // }

  return redirect(`/admin`);
  // return redirect(`https://${tenant.slug}.${url.host}`);
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
