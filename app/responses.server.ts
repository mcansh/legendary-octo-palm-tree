import { json, type TypedResponse } from "@remix-run/node";

export function notFound<Data>(
  data: Data,
  headers?: Headers,
): TypedResponse<Data> {
  throw json(data, { status: 404, statusText: "Not Found", headers });
}
