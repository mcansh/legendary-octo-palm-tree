import type { LinksFunction } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react/dist/routeModules";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import clsx from "clsx";

import appStylesHref from "~/styles/app.css";

import { useMatches } from "./matches";

export const meta: V2_MetaFunction = () => {
  return [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ];
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: appStylesHref }];
};

export default function App() {
  let matches = useMatches();
  let handleBodyClassName = matches.map((match) => match.handle?.bodyClassName);

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className={clsx("h-full", handleBodyClassName)}>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
