import { redirect, type LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  return redirect("/auth/login");
};

export default function Index() {
  return (
    <div className="font-sans">
      <h1 className="text-4xl text">Welcome to Snaply</h1>
    </div>
  );
}
