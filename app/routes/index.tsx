import type { DataFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { getTenant, getTenantSlug } from "~/utils.server";

export async function loader({ request }: DataFunctionArgs) {
  let slug = getTenantSlug(request);
  let tenant = await getTenant(slug);

  if (!tenant) {
    throw new Response("Tenant not found", { status: 404 });
  }

  return { tenant };
}

export default function Index() {
  let data = useLoaderData<typeof loader>();

  return (
    <>
      <nav className="flex justify-between items-center mx-8">
        <h1 className="text-xl">
          <a href="/">{data.tenant.name}</a>
        </h1>
        <ul className="flex gap-4">
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
      <main className="mx-8 mt-6">
        <div className="grid grid-cols-4 gap-4 justify-center items-center">
          {data.tenant.images.map((image) => (
            <img
              key={image.id}
              src={image.url}
              alt={image.alt}
              className="aspect-square w-full h-full rounded bg-gray-400"
            />
          ))}
        </div>
      </main>
    </>
  );
}
