import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getTenant } from "~/utils.server";

export async function loader({ request }: LoaderArgs) {
  let { hostname } = new URL(request.url);
  let tenantId = hostname.split(".")[0];
  let tenant = await getTenant(tenantId);

  if (!tenant) {
    throw new Response("Tenant not found", { status: 404 });
  }

  return { tenant };
}

export default function Index() {
  let data = useLoaderData<typeof loader>();

  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>
          <a href="/">{data.tenant.name}</a>
        </h1>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            gap: "1rem",
          }}
        >
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data.tenant.images.map((image) => (
          <img
            key={image.id}
            src={image.url}
            alt={image.alt}
            style={{
              width: "100%",
              height: "100%",
              aspectRatio: "1 / 1",
              borderRadius: 8,
              backgroundColor: "gray",
            }}
          />
        ))}
      </div>
    </div>
  );
}
