import { PassThrough } from "stream";
import type { EntryContext } from "@remix-run/node";
import { Response } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createSecureHeaders } from "@mcansh/remix-secure-headers";

const ABORT_DELAY = 5000;

let secureHeaders = createSecureHeaders({
  "Cross-Origin-Opener-Policy": "same-origin",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-DNS-Prefetch-Control": "on",
  "Content-Security-Policy": {
    defaultSrc: ["'none'"],
    styleSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    connectSrc: process.env.NODE_ENV === "production" ? [] : ["*"],
    imgSrc: ["'self'", "https://res.cloudinary.com"],
    prefetchSrc: ["'self'"],
    manifestSrc: ["'self'"],
  },
  "Strict-Transport-Security": {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
});

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  responseHeaders.set("Content-Type", "text/html");
  for (let header of secureHeaders) {
    responseHeaders.set(...header);
  }

  return isbot(request.headers.get("user-agent"))
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext
      );
}

function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let didError = false;

    let { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        onAllReady() {
          let body = new PassThrough();

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          didError = true;

          console.error(error);
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let didError = false;

    let { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        onShellReady() {
          let body = new PassThrough();

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(err: unknown) {
          reject(err);
        },
        onError(error: unknown) {
          didError = true;

          console.error(error);
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
