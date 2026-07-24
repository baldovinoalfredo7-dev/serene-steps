import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { MemberShell } from "@/components/miembros/MemberShell";
import { checkMembersUnlockedClient } from "@/lib/members-gate-client";

export const Route = createFileRoute("/miembros")({
  ssr: false,
  beforeLoad: async () => {
    const { unlocked } = await checkMembersUnlockedClient();
    if (!unlocked) throw redirect({ to: "/auth" });
  },
  head: () => ({
    meta: [
      { title: "Portal para Miembros · AA Área 2 Metropolitana" },
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
