import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { MemberShell } from "@/components/miembros/MemberShell";
import { checkMembersUnlocked } from "@/lib/members-gate.functions";

export const Route = createFileRoute("/miembros")({
  ssr: false,
  beforeLoad: async () => {
    const { unlocked } = await checkMembersUnlocked();
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
