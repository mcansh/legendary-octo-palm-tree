import type { CldOptions } from "@cld-apis/types";
import { redirect } from "@remix-run/node";
import {
  setConfig,
  buildImageUrl as cldBuildImageUrl,
} from "cloudinary-build-url";

import { CLOUDINARY_CLOUD_NAME, ROOT_DOMAIN } from "./constants.server";

export function getReturnTo(searchParams: URLSearchParams, fallback = "/") {
  let redirect = searchParams.get("return_to") || fallback;
  redirect = redirect.trim();
  if (redirect.startsWith("//") || redirect.startsWith("http")) {
    redirect = fallback;
  }
  return redirect || fallback;
}

export function rootDomainOnly(request: Request, pathname?: string) {
  let url = new URL(request.url);
  // only allow this route on the root domain
  if (url.hostname !== ROOT_DOMAIN) {
    let domain = ROOT_DOMAIN;
    pathname ||= url.pathname;
    if (url.port) domain += ":" + url.port;
    let redirectUrl = new URL(pathname, `${url.protocol}//${domain}`);
    throw redirect(redirectUrl.toString());
  }
}

export function createTenantUrl(
  request: Request,
  tenant: string,
  pathname = "/"
) {
  let url = new URL(request.url);
  let domain = `${tenant}.${ROOT_DOMAIN}`;
  if (url.port) domain += ":" + url.port;
  pathname ||= url.pathname;
  return new URL(pathname, `${url.protocol}//${domain}`).toString();
}

setConfig({
  cloudName: CLOUDINARY_CLOUD_NAME,
});

export function buildImageUrl(publicId: string, options: CldOptions = {}) {
  return cldBuildImageUrl(publicId, options);
}
