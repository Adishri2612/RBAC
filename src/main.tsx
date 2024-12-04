import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";

import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/provider/ThemeProvider";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="rbac-ui-theme">
      <Toaster />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
