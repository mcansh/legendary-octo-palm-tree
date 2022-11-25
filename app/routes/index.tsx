import type { DataFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { ThrownResponse } from "@remix-run/react";
import { Form } from "@remix-run/react";
import { useCatch, useLoaderData } from "@remix-run/react";

import { prisma } from "~/db.server";
import { getUserId } from "~/session.server";
import { getTenant, getTenantSlug } from "~/utils.server";

export async function loader({ request }: DataFunctionArgs) {
  let slug = getTenantSlug(request);
  let tenant = await getTenant(slug);

  let userId = await getUserId(request);
  let [user] = await prisma.user.findMany({
    where: { id: userId, tenants: { some: { slug } } },
  });

  if (!tenant) {
    throw json({ slug }, { status: 404, statusText: "Not Found" });
  }

  console.log({ user });

  return json({ tenant, user });
}

export default function Index() {
  let data = useLoaderData<typeof loader>();

  return (
    <>
      <nav className="flex justify-between items-center mx-8 my-4">
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
          {data.user ? (
            <li>
              <Form method="post" action="/logout">
                <button type="submit">Logout</button>
              </Form>
            </li>
          ) : null}
        </ul>
      </nav>
      <main className="mx-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 justify-center items-center">
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

export function CatchBoundary() {
  let caught = useCatch<ThrownResponse<number, { slug: string }>>();

  if (caught.status === 404) {
    return (
      <div className="grid place-items-center h-full text-center">
        <div>
          <h1 className="text-3xl font-semibold">
            {caught.status} {caught.statusText}
          </h1>
          <p className="text-xl mt-4">
            Tenant "{caught.data.slug}" does not exist
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid place-items-center h-full text-center">
      <div>
        <h1>Something went wrong</h1>
        <h2>
          {caught.status} {caught.statusText}
        </h2>
      </div>
    </div>
  );
}
