import { createCookieSessionStorage } from "@remix-run/node";

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is required");
}

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "auth_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export let { getSession, commitSession, destroySession } = sessionStorage;
