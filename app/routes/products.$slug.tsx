import * as React from "react";
import clsx from "clsx";
import type { DataFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  Link,
  useLoaderData,
  useLocation,
  useSearchParams,
} from "@remix-run/react";

import { getTenantBySlug, getTenantSlug } from "~/models/tenant";

export async function loader({ params, request }: DataFunctionArgs) {
  if (!params.slug) throw new Error("missing slug");

  let slug = getTenantSlug(request);
  let tenant = await getTenantBySlug(slug);

  if (!tenant) {
    throw json(
      { slug, product: null, policies: null },
      { status: 404, statusText: "Not Found" },
    );
  }

  if (!tenant.shopifyStorefrontAccessToken || !tenant.shopifyStorefrontUrl) {
    throw json(
      { slug, product: null, policies: null },
      { status: 404, statusText: "Not Found" },
    );
  }

  // let url = new URL(request.url);
  // let searchParams = [...url.searchParams.entries()];
  // let selectedOptions = searchParams.map(([name, value]) => {
  //   return { name, value };
  // });

  // let product = await commerce.getProduct(params.slug, selectedOptions);

  return json({ product: null as any });
}

export default function ProductOverview() {
  let data = useLoaderData<typeof loader>();
  let location = useLocation();
  let [searchParams] = useSearchParams();
  let [images, setImages] = React.useState(data.product?.images ?? []);

  console.log(data.product);

  if (!data.product) {
    return null;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="flex justify-between">
              <h1 className="text-xl font-medium text-gray-900">
                {data.product.title}
              </h1>
              <p className="text-xl font-medium text-gray-900">
                {data.product?.formattedPrice}
              </p>
            </div>
          </div>
          {/* Image gallery */}
          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Images</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
              {images.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt=""
                  className={clsx(
                    index === 0
                      ? "lg:col-span-2 lg:row-span-2"
                      : "hidden lg:block",
                    "rounded-lg",
                  )}
                  onClick={() => {
                    setImages([image, ...images.filter((i) => i !== image)]);
                  }}
                />
              ))}
            </div>
          </div>
          <div className="mt-8 lg:col-span-5">
            <div className="space-y-4">
              {data.product.options.map((option) => {
                return (
                  <div key={option.name}>
                    <h2 className="text-sm font-medium text-gray-900">
                      {option.name}
                    </h2>

                    <div className="mt-2">
                      <div className="sr-only"> Choose a color </div>
                      <div className="flex items-center space-x-3">
                        {option.values.map((optionValue) => {
                          let sp = new URLSearchParams(location.search);
                          sp.set(option.name, optionValue);

                          let selectedOption =
                            searchParams.get(option.name) === optionValue;

                          return (
                            <Link
                              key={optionValue}
                              to={{
                                pathname: location.pathname,
                                search: sp.toString(),
                              }}
                              className={clsx(
                                "cursor-pointer focus:outline-none",
                                // size.inStock ? 'cursor-pointer focus:outline-none' : 'opacity-25 cursor-not-allowed',
                                // active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                                selectedOption
                                  ? "bg-indigo-600 border-transparent text-white hover:bg-indigo-700 ring-offset-2 ring-indigo-500 ring-2"
                                  : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                                "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1",
                              )}
                            >
                              {optionValue}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}

              <Form method="post" replace className="space-y-4">
                <button
                  type="submit"
                  formMethod="post"
                  className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-slate-400 disabled:cursor-not-allowed"
                  name="selectedVariantId"
                  value={data.product.selectedVariantId}
                  disabled={
                    !data.product.selectedVariantId ||
                    !data.product?.availableForSale
                  }
                >
                  Add to cart
                </button>
              </Form>
            </div>

            {/* Product details */}
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Description</h2>

              {/* <div
              className="prose prose-sm mt-4 text-gray-500"
              dangerouslySetInnerHTML={{ __html: product.description }}
            /> */}
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-sm font-medium text-gray-900">
                Fabric &amp; Care
              </h2>

              <div className="prose prose-sm mt-4 text-gray-500">
                <ul>
                  {/* {product.details.map((item) => (
                  <li key={item}>{item}</li>
                ))} */}
                </ul>
              </div>
            </div>

            {/* Policies */}
            <section aria-labelledby="policies-heading" className="mt-10">
              <h2 id="policies-heading" className="sr-only">
                Our Policies
              </h2>

              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {/* {data.policies.map((policy) => (
                <div
                  key={policy.name}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center"
                >
                  <dt>
                    <policy.icon
                      className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="mt-4 text-sm font-medium text-gray-900">
                      {policy.name}
                    </span>
                  </dt>
                  <dd className="mt-1 text-sm text-gray-500">
                    {policy.description}
                  </dd>
                </div>
              ))} */}
              </dl>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
