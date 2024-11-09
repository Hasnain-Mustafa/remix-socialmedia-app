import { type LoaderFunction } from "@remix-run/node";
import { authenticator } from "@/lib/auth.server";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/auth/login",
  });

  return user;
};

export default function Index() {
  const user = useLoaderData<typeof loader>();

  return (
    <div className="flex-center h-screen font-sans">
      <h1 className="text-4xl">Welcome to Snaply</h1>
    </div>
  );
}
