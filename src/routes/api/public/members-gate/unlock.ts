import { createFileRoute } from "@tanstack/react-router";
import {
  checkUnlocked,
  clearGateCookie,
  makeGateCookie,
  verifyPassword,
} from "@/lib/members-gate";

export const Route = createFileRoute("/api/public/members-gate/unlock")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { password?: string } = {};
        try {
          body = (await request.json()) as { password?: string };
        } catch {
          return Response.json({ ok: false, error: "bad_request" }, { status: 400 });
        }
        if (!body?.password || !verifyPassword(body.password)) {
          return Response.json({ ok: false }, { status: 200 });
        }
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: {
            "content-type": "application/json",
            "set-cookie": makeGateCookie(),
            "cache-control": "no-store",
          },
        });
      },
    },
  },
});
