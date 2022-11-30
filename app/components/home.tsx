import { Form, Link } from "@remix-run/react";

export function Home({ loggedIn = false }: { loggedIn?: boolean }) {
  return (
    <div className="min-h-full bg-black text-center">
      <nav className="text-white flex items-center justify-between px-10 fixed top-0 w-full left-0 bg-black py-6">
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
      <h1 className="text-8xl font-extrabold text-white max-w-4xl mx-auto pt-20">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-600 to-indigo-500">
          Streamline
        </span>{" "}
        booking the easy way
      </h1>
      <h2 className="text-gray-400 max-w-2xl mx-auto mt-4 text-xl">
        Custom website. Integrated booking with direct calendar integration.
        E-mail notifications. List and sell your products directly. You name it.
      </h2>

      <div className="mt-8 space-x-6 flex items-center justify-center">
        <Link to="/buy" className="text-black bg-white px-4 py-2 rounded-md">
          Buy now
        </Link>

        <Link
          to="/buy"
          className="rounded-md bg-gradient-to-r from-yellow-200 via-pink-600 to-indigo-500 p-0.5"
        >
          <span className="block text-white bg-black px-3.5 py-1.5 rounded">
            Learn more
          </span>
        </Link>
      </div>

      <div id="features" className="h-screen">
        <h1 className="text-8xl font-extrabold text-white max-w-4xl mx-auto pt-20">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-600 to-indigo-500">
            Features
          </span>
        </h1>
      </div>
      <div id="pricing" className="h-screen">
        <h1 className="text-8xl font-extrabold text-white max-w-4xl mx-auto pt-20">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-600 to-indigo-500">
            Pricing
          </span>
        </h1>
      </div>
      <div id="help" className="h-screen">
        <h1 className="text-8xl font-extrabold text-white max-w-4xl mx-auto pt-20">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-600 to-indigo-500">
            Help
          </span>
        </h1>
      </div>
    </div>
  );
}
