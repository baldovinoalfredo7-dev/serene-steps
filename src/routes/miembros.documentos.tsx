import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, Eye } from "lucide-react";
import { MemberPageHeader } from "@/components/miembros/SectionCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import informe62 from "@/assets/docs/informe-62-csg.pdf.asset.json";
import tallerIP from "@/assets/docs/taller-informacion-publica.pdf.asset.json";
import tallerInventario from "@/assets/docs/taller-inventario-grupo.pptx.asset.json";

export const Route = createFileRoute("/miembros/documentos")({
  head: () => ({
    meta: [
      { title: "Documentos para descargar · Portal para Miembros" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: DocumentosPage,
});

type Doc = {
  title: string;
  description: string;
  href: string;
  fileType: "PDF" | "PowerPoint";
  pages?: string;
  date?: string;
  previewable: boolean;
};

const documentosServicio: Doc[] = [
  {
    title:
      "Informe Final de la 62.ª Reunión Anual de la Conferencia de Servicios Generales de Alcohólicos Anónimos",
    description:
      "Resumen de las recomendaciones, acciones y conclusiones aprobadas durante la 62.ª Reunión Anual de la Conferencia de Servicios Generales. Útil para conocer las decisiones que orientan el servicio en Colombia.",
    href: informe62.url,
    fileType: "PDF",
    pages: "216 páginas",
    date: "2026",
    previewable: true,
  },
];

const talleres: Doc[] = [
  {
    title: "Taller de Información Pública",
    description:
      "Guía de trabajo para preparar y desarrollar actividades de Información Pública. Explica el propósito del comité, las pautas de anonimato y ejemplos prácticos para llevar el mensaje a la comunidad.",
    href: tallerIP.url,
    fileType: "PDF",
    pages: "36 páginas",
    date: "2022",
    previewable: true,
  },
  {
    title: "Taller de Inventario de Grupo",
    description:
      "Presentación de apoyo para realizar el inventario del grupo. Reúne las preguntas guía y los criterios de evaluación que ayudan al grupo a revisar su funcionamiento y su fidelidad a las Tradiciones.",
    href: tallerInventario.url,
    fileType: "PowerPoint",
    pages: "27 diapositivas",
    previewable: false,
  },
];

function DocumentosPage() {
  const [activeDoc, setActiveDoc] = useState<Doc | null>(null);

  return (
    <div className="mx-auto max-w-5xl space-y-14">
      <MemberPageHeader
        title="Documentos para descargar"
        intro="Aquí encontrarás recursos de apoyo para el servicio del Área 2 Metropolitana de Barranquilla."
      />

      <CategorySection id="documentos-servicio" emoji="📑" title="Documentos de servicio">
        {documentosServicio.map((doc) => (
          <DocumentCard key={doc.title} doc={doc} onPreview={setActiveDoc} />
        ))}
      </CategorySection>

      <CategorySection id="talleres" emoji="🎓" title="Talleres">
        {talleres.map((doc) => (
          <DocumentCard key={doc.title} doc={doc} onPreview={setActiveDoc} />
        ))}
      </CategorySection>

      <CategorySection id="formatos" emoji="📋" title="Formatos">
        <p className="text-base leading-relaxed text-ink/85">
          En esta sección estarán disponibles los formatos y formularios utilizados por el Área para apoyar las diferentes actividades de servicio. A medida que sean aprobados, se incorporarán para su consulta y descarga.
        </p>
      </CategorySection>

      <PreviewDialog doc={activeDoc} onClose={() => setActiveDoc(null)} />
    </div>
  );
}

function CategorySection({
  id,
  emoji,
  title,
  children,
}: {
  id?: string;
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

function Metadata({ doc }: { doc: Doc }) {
  const items = [doc.fileType, doc.pages, doc.date].filter(Boolean) as string[];
  return (
    <ul className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink/55">
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-2">
          {i > 0 && (
            <span aria-hidden className="text-brand/30">
              ·
            </span>
          )}
          {item}
        </li>
      ))}
    </ul>
  );
}

function DocumentCard({
  doc,
  onPreview,
}: {
  doc: Doc;
  onPreview: (doc: Doc) => void;
}) {
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
      <h3 className="font-serif text-lg leading-snug text-brand">{doc.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/75">
        {doc.description}
      </p>
      <Metadata doc={doc} />
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={doc.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-paper shadow-sm transition-colors hover:bg-brand/90"
        >
          <Download className="size-4" /> Descargar
        </a>
        <button
          type="button"
          onClick={() => onPreview(doc)}
          className="inline-flex items-center gap-2 rounded-full border border-brand/30 px-5 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand/10"
        >
          <Eye className="size-4" /> Vista previa
        </button>
      </div>
    </article>
  );
}

function PreviewDialog({
  doc,
  onClose,
}: {
  doc: Doc | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!doc} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto rounded-3xl bg-paper">
        {doc && (
          <>
            <DialogHeader>
              <DialogTitle className="pr-6 text-left font-serif text-xl leading-snug text-brand">
                {doc.title}
              </DialogTitle>
              <DialogDescription className="text-left text-sm leading-relaxed text-ink/75">
                {doc.description}
              </DialogDescription>
            </DialogHeader>
            <Metadata doc={doc} />
            <div className="mt-2 overflow-hidden rounded-2xl border border-brand/10 bg-brand-soft/30">
              {doc.previewable ? (
                <object
                  data={`${doc.href}#page=1&toolbar=0&navpanes=0`}
                  type="application/pdf"
                  className="h-[55vh] w-full"
                  aria-label={`Vista previa de ${doc.title}`}
                >
                  <p className="p-6 text-sm leading-relaxed text-ink/75">
                    Tu navegador no permite mostrar la vista previa. Puedes
                    descargar el documento para consultarlo.
                  </p>
                </object>
              ) : (
                <p className="p-6 text-sm leading-relaxed text-ink/75">
                  Este archivo es una presentación de PowerPoint y no puede
                  visualizarse dentro del portal. Descárgalo para consultarlo
                  completo.
                </p>
              )}
            </div>
            <div className="mt-2">
              <a
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-paper shadow-sm transition-colors hover:bg-brand/90"
              >
                <Download className="size-4" /> Descargar
              </a>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
