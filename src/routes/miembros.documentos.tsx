import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download } from "lucide-react";
import { MemberPageHeader } from "@/components/miembros/SectionCard";

export const Route = createFileRoute("/miembros/documentos")({
  head: () => ({
    meta: [
      { title: "Documentos para descargar · Portal para Miembros" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: DocumentosPage,
});

function DocumentosPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-14">
      <MemberPageHeader
        title="Documentos para descargar"
        intro="Aquí encontrarás recursos de apoyo para el servicio del Área 2 Metropolitana de Barranquilla."
      />

      <CategorySection
        emoji="📑"
        title="Documentos de servicio"
      >
        <DocumentCard
          title="Informe de la 62.ª Reunión Anual de la Conferencia de Servicios Generales de Alcohólicos Anónimos"
          motto="La recuperación y la práctica de las tradiciones garantizan un mejor servicio."
        />
      </CategorySection>

      <CategorySection emoji="🎓" title="Talleres">
        <DocumentCard title="Taller de Información Pública" />
      </CategorySection>

      <CategorySection emoji="📋" title="Formatos">
        <p className="text-base leading-relaxed text-ink/85">
          En esta sección estarán disponibles los formatos y formularios utilizados por el Área para apoyar las diferentes actividades de servicio. A medida que sean aprobados, se incorporarán para su consulta y descarga.
        </p>
      </CategorySection>
    </div>
  );
}

function CategorySection({
  emoji,
  title,
  children,
}: {
  emoji: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-6 flex items-center gap-3 font-serif text-2xl leading-tight text-brand sm:text-3xl">
        <span aria-hidden className="text-2xl">
          {emoji}
        </span>
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function DocumentCard({ title, motto }: { title: string; motto?: string }) {
  return (
    <article className="flex flex-col rounded-3xl border border-brand/10 bg-paper p-6 shadow-sm transition-shadow hover:shadow-lift">
      <div className="mb-4 flex items-center gap-3">
        <span
          aria-hidden
          className="grid size-11 place-items-center rounded-2xl bg-brand/10 text-brand"
        >
          <FileText className="size-5" />
        </span>
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand/70">
          Documento
        </span>
      </div>
      <h3 className="font-serif text-lg leading-snug text-brand">{title}</h3>
      {motto && (
        <p className="mt-3 border-l-2 border-brand/30 pl-3 font-serif text-sm italic leading-relaxed text-ink/75">
          {motto}
        </p>
      )}
      <div className="mt-6 self-start">
        <button
          type="button"
          disabled
          aria-disabled="true"
          title="Documento en preparación"
          className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-brand/80 px-5 py-2 text-sm font-semibold text-paper opacity-70"
        >
          <Download className="size-4" /> Descargar PDF
        </button>
      </div>
    </article>
  );
}
