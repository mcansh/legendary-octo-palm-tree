import { json } from "@remix-run/node";
import type { MetaFunction, DataFunctionArgs } from "@remix-run/node";
import {
  Form,
  Link,
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

export async function loader({ request }: DataFunctionArgs) {
  let userId = await getUserId(request);

  let url = new URL(request.url);

  if (url.hostname === ROOT_DOMAIN) {
    return json({
      tenant: null,
      userId,
      userIsMember: null,
      products: null,
    });
  }

  let slug = getTenantSlug(request);
  let tenant = await getTenantBySlug(slug);

  if (!tenant) {
    throw json(
      { slug, userId, userIsMember: null, products: null },
      {
        status: 404,
        statusText: "Not Found",
      },
    );
  }

  let userIsMember = await doesUserBelongToTenant(userId, tenant.id);

  if (!tenant.shopifyStorefrontAccessToken || !tenant.shopifyStorefrontUrl) {
    return json({
      slug,
      userId,
      userIsMember: null,
      products: null,
      tenant: null,
    });
  }

  let commerce = createShopifyProvider({
    storefrontAccessToken: tenant.shopifyStorefrontAccessToken,
    storefrontApiUrl: createStorefrontApiUrl(tenant.shopifyStorefrontUrl),
  });

  let products = await commerce.getProducts();

  return json({
    products: products.products,
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

export const meta: MetaFunction<typeof loader> = ({ data, matches }) => {
  let title = data?.tenant ? data.tenant.name : "Home";
  return [
    // ...(matches.map(
    //   (match) => match.meta
    // ) as unknown as V2_HtmlMetaDescriptor[]),
    { title },
  ];
};

export default function Index() {
  let data = useLoaderData<typeof loader>();

  console.log({ data });

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
        <div className="bg-white">
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>

            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {data.products.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.slug}`}
                  className="group"
                >
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {product.formattedPrice}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export function ErrorBoundary() {
  let error = useRouteError();

  let status = isRouteErrorResponse(error) ? error.status : 500;
  let statusText = isRouteErrorResponse(error)
    ? error.statusText
    : "Internal Error";

  console.error(error);

  if (status === 404) {
    // let userId = error.data.userId;
    // return <Home loggedIn={!!caught.data.userId} />;
    return <Home />;
  }

  return (
    <div className="grid place-items-center h-full text-center">
      <div>
        <h1>Something went wrong</h1>
        <h2>
          {status} {statusText}
        </h2>
      </div>
    </div>
  );
}
