import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import stylesheet from "@/tailwind.css?url";
import { Toaster } from "sonner";
import { getToast } from "remix-toast";

export const meta: MetaFunction = () => {
  return [
    { title: "Snaply" },
    {
      name: "description",
      content: "Welcome to Snaply! A modern social media application.",
    },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const loader: LoaderFunction = async ({ request }) => {
  const { toast, headers } = await getToast(request);
  return json({ toast }, { headers });
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            unstyled: true,
            classNames: {
              toast: "bg-primary-500",
              description: "text-light-1",
            },
          }}
        />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
