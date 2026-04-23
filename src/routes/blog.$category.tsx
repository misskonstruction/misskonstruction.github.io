import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/$category")({
  component: CategoryLayout,
});

function CategoryLayout() {
  return <Outlet />;
}
