import type { DataFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getTenantsByUserId } from "~/models/tenant";
import { requireUser } from "~/session.server";
import { createTenantUrl, rootDomainOnly } from "~/utils.server";

export async function loader({ request }: DataFunctionArgs) {
  let user = await requireUser(request);

  // only allow this route on the root domain
  rootDomainOnly(request);

  let tenants = await getTenantsByUserId(user.id);

  return json({
    tenants: tenants.map((tenant) => {
      return {
        ...tenant,
        url: createTenantUrl(request, tenant.slug),
      };
    }),
  });
}

export default function Dashboard() {
  let data = useLoaderData<typeof loader>();
  return (
    <div className="mx-8 my-4">
      <h1 className="text-2xl">Tenants I manage</h1>

      <ul className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {data.tenants.map((tenant) => {
          return (
            <li key={tenant.id}>
              <div>{tenant.name}</div>
              <div className="grid grid-cols-2 space-x-2 text-center">
                <a
                  href={tenant.url}
                  className="rounded bg-indigo-600 py-2 text-white"
                >
                  view site
                </a>
                <Link
                  to={tenant.slug + "/edit"}
                  className="border py-2 text-indigo-600"
                >
                  manage
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
