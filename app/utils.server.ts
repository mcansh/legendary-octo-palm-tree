import type { CldOptions } from "@cld-apis/types";
import { redirect } from "@remix-run/node";
import {
  setConfig,
  buildImageUrl as cldBuildImageUrl,
} from "cloudinary-build-url";

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
  pathname ||= url.pathname;
  // only allow this route on the root domain
  if (url.hostname !== "localhost") {
    throw redirect(url.protocol + "//localhost:" + url.port + pathname);
  }
}

setConfig({
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
});

export function buildImageUrl(publicId: string, options: CldOptions = {}) {
  return cldBuildImageUrl(publicId, options);
}
