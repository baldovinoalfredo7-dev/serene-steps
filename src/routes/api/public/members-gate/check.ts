import { createFileRoute } from "@tanstack/react-router";
import { checkUnlocked } from "@/lib/members-gate";

export const Route = createFileRoute("/api/public/members-gate/check")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const unlocked = checkUnlocked(request);
        return Response.json({ unlocked }, { headers: { "cache-control": "no-store" } });
      },
    },
  },
});
