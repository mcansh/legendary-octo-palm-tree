import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/react";
import {
  Form,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";

import {
  doesUserBelongToTenant,
  getTenantBySlug,
  getTenantSlug,
} from "~/models/tenant";
import { getUserId } from "~/session.server";
import { buildImageUrl } from "~/utils.server";
import { ROOT_DOMAIN } from "~/constants.server";
import { Home } from "~/components/home";
import { notFound } from "~/responses.server";

export async function loader({ request }: LoaderFunctionArgs) {
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

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [];
  let title = data?.tenant ? data.tenant.name : "Home";
  return [{ title }];
};

export default function Index() {
  let data = useLoaderData<typeof loader>();

  if (!data.tenant) {
    return <Home loggedIn={!!data.userId} />;
  }

  return (
    <>
      <nav className="mx-8 my-4 flex items-center justify-between">
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
        <div className="grid grid-cols-2 items-center justify-center gap-4 lg:grid-cols-4">
          {data.tenant.images.map((image) => (
            <img
              key={image.id}
              src={image.url}
              alt={image.alt}
              className="aspect-square h-full w-full rounded bg-gray-400"
            />
          ))}
        </div>
      </main>
    </>
  );
}

export function ErrorBoundary() {
  let error = useRouteError();
  if (typeof document === "undefined") {
    console.error(error);
  }

  if (
    isRouteErrorResponse(error) &&
    error.status === 404 &&
    "userId" in error.data &&
    typeof error.data.userId === "string"
  ) {
    return <Home loggedIn={!!error.data.userId} />;
  }

  let status = 500;
  let statusText = "Internal Server Error";

  if (isRouteErrorResponse(error)) {
    status = error.status;
    statusText = error.statusText;
  }

  return (
    <div className="grid h-full place-items-center text-center">
      <div>
        <h1>Something went wrong</h1>
        <h2>
          {status} {statusText}
        </h2>
      </div>
    </div>
  );
}
