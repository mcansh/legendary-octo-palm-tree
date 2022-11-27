import type { DataFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getTenantsByUserId } from "~/models/tenant";
import { requireUser } from "~/session.server";
import { rootDomainOnly } from "~/utils.server";

export async function loader({ request }: DataFunctionArgs) {
  let user = await requireUser(request);

  let url = new URL(request.url);

  // only allow this route on the root domain
  rootDomainOnly(request);

  let tenants = await getTenantsByUserId(user.id);

  return json({
    tenants: tenants.map((tenant) => {
      return {
        ...tenant,
        url: `${url.protocol}//${tenant.slug}.${url.host.split(".").pop()}`,
      };
    }),
  });
}

export default function Dashboard() {
  let data = useLoaderData<typeof loader>();
  return (
    <div className="mx-8 my-4">
      <h1 className="text-2xl">Tenants I manage</h1>

      <ul className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {data.tenants.map((tenant) => {
          return (
            <li key={tenant.id}>
              <div>{tenant.name}</div>
              <div className="space-x-2 grid grid-cols-2 text-center">
                <a
                  href={tenant.url}
                  className="bg-indigo-600 text-white rounded py-2"
                >
                  view site
                </a>
                <Link
                  to={tenant.slug + "/edit"}
                  className="text-indigo-600 border py-2"
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
