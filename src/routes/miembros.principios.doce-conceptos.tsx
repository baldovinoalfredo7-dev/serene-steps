import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { MemberPageHeader } from "@/components/miembros/SectionCard";

export const Route = createFileRoute("/miembros/principios/doce-conceptos")({
  head: () => ({
    meta: [
      { title: "Los Doce Conceptos para el Servicio Mundial · Portal para Miembros" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: DoceConceptosPage,
});

function DoceConceptosPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Link
        to="/miembros/principios"
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
      >
        <ArrowLeft className="size-4" /> Volver a Los 36 principios
      </Link>
      <MemberPageHeader
        eyebrow="Los 36 principios"
        title="Los Doce Conceptos para el Servicio Mundial"
        intro="Los Doce Conceptos ofrecen principios para el ejercicio responsable del servicio dentro de la estructura de Alcohólicos Anónimos."
      />
      <section
        aria-label="Texto oficial de los Doce Conceptos"
        className="rounded-3xl border border-dashed border-brand/25 bg-paper p-8 min-h-[240px]"
      >
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand/60">
          Espacio reservado para el texto oficial
        </p>
      </section>
    </div>
  );
}
