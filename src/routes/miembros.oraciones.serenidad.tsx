import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { MemberPageHeader } from "@/components/miembros/SectionCard";

export const Route = createFileRoute("/miembros/oraciones/serenidad")({
  head: () => ({
    meta: [
      { title: "Oración de la Serenidad · Portal para Miembros" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: SerenidadPage,
});

const parrafos: string[] = [
  "Dios, concédeme la serenidad para aceptar las cosas que no puedo cambiar, valor para cambiar las cosas que puedo cambiar y la sabiduría para conocer la diferencia.",
  "Amén.",
];

function SerenidadPage() {
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
        title="Oración de la Serenidad"
      />
      <section
        aria-label="Texto oficial de la Oración de la Serenidad"
        className="rounded-3xl border border-brand/10 bg-paper p-6 sm:p-8 shadow-sm"
      >
        <div className="space-y-6 font-serif text-lg leading-relaxed text-ink/85 sm:text-xl">
          {parrafos.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
