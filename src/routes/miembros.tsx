import { createFileRoute, Outlet } from "@tanstack/react-router";
import { MemberShell } from "@/components/miembros/MemberShell";

export const Route = createFileRoute("/miembros")({
  head: () => ({
    meta: [
      { title: "Área de miembros · AA Área 2 Metropolitana" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: MembersLayout,
});

function MembersLayout() {
  return (
    <MemberShell>
      <Outlet />
    </MemberShell>
  );
}
