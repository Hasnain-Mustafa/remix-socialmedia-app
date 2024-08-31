import { vitePlugin as remix } from "@remix-run/dev";
import { createRoutesFromFolders } from "@remix-run/v1-route-convention";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      ignoredRouteFiles: ["**/.*"],
      routes(defineRoutes) {
        return createRoutesFromFolders(defineRoutes);
      },
    }),
    tsconfigPaths(),
  ],
  server: {
    port: 3000,
  },
});
