import { Outlet } from "@remix-run/react";

export default function AuthLayout() {
  return (
    <div className="h-screen flex-center">
      <div className="flex-center flex-col">
        <div className="ml-[-10px] flex items-center gap-2">
          <img src="/assets/images/logo-a.svg" className="h-8" alt="logo" />
          <p className="text-2xl font-semibold">Snaply</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
