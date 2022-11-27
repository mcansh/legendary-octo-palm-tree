import { redirect } from "@remix-run/node";

export function getReturnTo(searchParams: URLSearchParams, fallback = "/") {
  let redirect = searchParams.get("return_to") || fallback;
  redirect = redirect.trim();
  if (redirect.startsWith("//") || redirect.startsWith("http")) {
    redirect = fallback;
  }
  return redirect || fallback;
}

export function rootDomainOnly(request: Request) {
  let url = new URL(request.url);
  // only allow this route on the root domain
  if (url.hostname !== "localhost") {
    throw redirect(url.protocol + "//localhost:" + url.port + url.pathname);
  }
}
