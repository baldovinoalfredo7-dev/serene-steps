import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Área de Servicio — AA Área 2 Metropolitana" },
      {
        name: "description",
        content: "Acceso privado para servidores autorizados del Área 2 Metropolitana.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Auth,
});

function Auth() {
  return (
    <PageShell
      eyebrow="Acceso restringido"
      title="Área de servicio"
      intro="Espacio privado para servidores autorizados. El acceso estará disponible próximamente."
    >
      <div className="mx-auto max-w-md rounded-2xl border border-brand/10 bg-paper p-10 text-center">
        <span className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-brand/10 text-brand">
          <Lock className="size-5" />
        </span>
        <h3 className="mb-2 font-serif text-2xl italic text-brand">Próximamente</h3>
        <p className="text-sm text-ink/60">
          El módulo de acceso para servidores estará habilitado en la siguiente fase, junto con la
          administración de grupos, eventos y contenidos.
        </p>
      </div>
    </PageShell>
  );
}
