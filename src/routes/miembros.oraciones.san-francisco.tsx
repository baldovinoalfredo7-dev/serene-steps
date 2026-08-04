import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { MemberPageHeader } from "@/components/miembros/SectionCard";

export const Route = createFileRoute("/miembros/oraciones/san-francisco")({
  head: () => ({
    meta: [
      { title: "Oración de San Francisco de Asís · Portal para Miembros" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: SanFranciscoPage,
});

const versos: string[] = [
  "Dios, hazme un instrumento de tu paz.",
  "Que donde haya odio,",
  "siembre amor.",
  "Donde haya injuria,",
  "perdón.",
  "Donde haya discordia,",
  "armonía.",
  "Donde haya error,",
  "verdad.",
  "Donde haya duda,",
  "fe.",
  "Donde haya desesperación,",
  "esperanza.",
  "Donde haya sombras,",
  "luz.",
  "Donde haya tristeza,",
  "alegría.",
  "Dios, concédeme que busque no ser consolado, sino consolar; no ser comprendido, sino comprender; no ser amado, sino amar.",
  "Porque olvidándome de mí mismo, me encuentro; perdonando, se me perdona; muriendo en Ti, nazco a la Vida Eterna.",
  "Amén.",
];

function SanFranciscoPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Link
        to="/miembros/oraciones"
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
      >
        <ArrowLeft className="size-4" /> Volver a Nuestras oraciones
      </Link>
      <MemberPageHeader
        eyebrow="Nuestras oraciones"
        title="Oración de San Francisco de Asís"
      />
      <section
        aria-label="Texto oficial de la Oración de San Francisco de Asís"
        className="card-aa sm:p-8"
      >
        <div className="space-y-4 font-serif text-lg leading-relaxed text-ink/85 sm:text-xl">
          {versos.map((v, i) => (
            <p key={i}>{v}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
