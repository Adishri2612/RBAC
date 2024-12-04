import { useAuthStore } from "@/store";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  beforeLoad: async () => {
    const isLogin = useAuthStore.getState().getIsLogin();
    if (isLogin) {
      throw redirect({
        to: "..",
      });
    }
  },

  component: Outlet,
});
