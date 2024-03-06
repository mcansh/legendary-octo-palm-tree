import * as React from "react";
import type { LinkProps } from "@remix-run/react";
import { Form, Link } from "@remix-run/react";

export function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-yellow-200 via-pink-600 to-indigo-500 bg-clip-text text-transparent">
      {children}
    </span>
  );
}

export function DiscoLink({ children, to, ...rest }: LinkProps) {
  return (
    <Link to={to} className="disco_button" {...rest}>
      <span className="content">{children}</span>
      <span aria-hidden className="disco" />
    </Link>
  );
}

export function Home({ loggedIn = false }: { loggedIn?: boolean }) {
  return (
    <div className="min-h-full bg-black text-center">
      <nav className="fixed left-0 top-0 hidden w-full items-center justify-between bg-black px-10 py-6 text-white sm:flex">
        <div>
          <Link to="/">Vancouver</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#pricing">Pricing</a>
          </li>
          <li>
            <a href="#help">Help</a>
          </li>
        </ul>
        {loggedIn ? (
          <ul className="flex space-x-4">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Form method="post" action="/logout">
                <button type="submit">Logout</button>
              </Form>
            </li>
          </ul>
        ) : (
          <ul className="flex space-x-4">
            <li>
              <Link to="/login">Sign in</Link>
            </li>
            <li>
              <Link to="/signup">Get started</Link>
            </li>
          </ul>
        )}
      </nav>
      <div className="pt-28" />
      <h1 className="mx-auto max-w-4xl text-5xl font-extrabold text-white lg:text-8xl">
        <GradientText>Streamline</GradientText> booking the easy way
      </h1>
      <h2 className="mx-auto mt-4 max-w-2xl px-4 text-xl text-gray-400 sm:px-0">
        Custom website. Integrated booking with direct calendar integration.
        E-mail notifications. List and sell your products directly. You name it.
      </h2>

      <div className="mt-8 flex items-center justify-center space-x-6">
        <Link to="/buy" className="rounded-md bg-white px-4 py-2 text-black">
          Buy now
        </Link>

        <DiscoLink to="/buy">Learn more</DiscoLink>
      </div>

      <div id="features" className="h-screen">
        <h1 className="mx-auto max-w-4xl pt-20 text-5xl font-extrabold text-white lg:text-8xl">
          <GradientText>Features</GradientText>
        </h1>
      </div>
      <div id="pricing" className="h-screen">
        <h1 className="mx-auto max-w-4xl pt-20 text-5xl font-extrabold text-white lg:text-8xl">
          <GradientText>Pricing</GradientText>
        </h1>
      </div>
      <div id="help" className="h-screen">
        <h1 className="mx-auto max-w-4xl pt-20 text-5xl font-extrabold text-white lg:text-8xl">
          <GradientText>Help</GradientText>
        </h1>
      </div>
    </div>
  );
}
