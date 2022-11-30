import type { DataFunctionArgs, SerializeFrom } from "@remix-run/node";
import { json } from "@remix-run/node";
import type {
  V2_HtmlMetaDescriptor,
  V2_MetaFunction,
} from "@remix-run/react/dist/routeModules";
import type { ThrownResponse } from "@remix-run/react";
import { Form } from "@remix-run/react";
import { useCatch, useLoaderData } from "@remix-run/react";
import { notFound } from "remix-utils";

import { doesUserBelongToTenant } from "~/models/tenant";
import { getUserId } from "~/session.server";
import { getTenantBySlug, getTenantSlug } from "~/models/tenant";
import { buildImageUrl } from "~/utils.server";
import { ROOT_DOMAIN } from "~/constants.server";
import { Home } from "~/components/home";

export async function loader({ request }: DataFunctionArgs) {
  let userId = await getUserId(request);

  let url = new URL(request.url);

  if (url.hostname === ROOT_DOMAIN) {
    return json({
      tenant: null,
      userId,
      userIsMember: null,
    });
  }

  let slug = getTenantSlug(request);
  let tenant = await getTenantBySlug(slug);

  if (!tenant) {
    throw notFound({ slug, userId, userIsMember: null });
  }

  let userIsMember = await doesUserBelongToTenant(userId, tenant.id);

  return json({
    userId,
    userIsMember,
    tenant: {
      ...tenant,
      images: tenant.images.map((image) => {
        return {
          ...image,
          url: buildImageUrl(image.public_id, {
            transformations: {
              resize: { height: 400, width: 400 },
            },
          }),
        };
      }),
    },
  });
}

export const meta: V2_MetaFunction = (args) => {
  let data: SerializeFrom<typeof loader> | undefined = args.data;
  let title = data?.tenant ? data.tenant.name : "Home";
  return [
    ...(args.matches.map(
      (match) => match.meta
    ) as unknown as V2_HtmlMetaDescriptor[]),
    { title },
  ];
};

export default function Index() {
  let data = useLoaderData<typeof loader>();

  if (!data.tenant) {
    return <Home loggedIn={!!data.userId} />;
  }

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
          {data.userIsMember ? (
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
  let caught = useCatch<ThrownResponse<number, SerializeFrom<typeof loader>>>();

  if (caught.status === 404) {
    return <Home loggedIn={!!caught.data.userId} />;
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
