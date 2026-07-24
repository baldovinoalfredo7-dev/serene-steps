import { createFileRoute } from "@tanstack/react-router";
import { clearGateCookie } from "@/lib/members-gate";

export const Route = createFileRoute("/api/public/members-gate/lock")({
  server: {
    handlers: {
      POST: async () => {
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: {
            "content-type": "application/json",
            "set-cookie": clearGateCookie(),
            "cache-control": "no-store",
          },
        });
      },
    },
  },
});
