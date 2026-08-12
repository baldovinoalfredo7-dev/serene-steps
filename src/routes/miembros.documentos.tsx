import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, Eye, CalendarDays, Search, ExternalLink } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

import { MemberPageHeader } from "@/components/miembros/SectionCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Documentos
import informe62 from "@/assets/docs/informe-62-csg.pdf.asset.json";
import tallerIP from "@/assets/docs/taller-informacion-publica.pdf.asset.json";
import tallerInventario from "@/assets/docs/taller-inventario-grupo.pptx.asset.json";
import tallerInventarioPdf from "@/assets/docs/taller-inventario-grupo-pdf.pdf.asset.json";
import tallerActoEscribir from "@/assets/docs/taller-acto-escribir.pdf.asset.json";
import tallerAutomantenimiento from "@/assets/docs/taller-automantenimiento.pptx.asset.json";
import tallerAutomantenimientoPdf from "@/assets/docs/taller-automantenimiento-pdf.pdf.asset.json";
import tallerHistoriaRevista from "@/assets/docs/taller-historia-revista.pptx.asset.json";
import tallerHistoriaRevistaPdf from "@/assets/docs/taller-historia-revista-pdf.pdf.asset.json";
import tallerNuestraRevista from "@/assets/docs/taller-nuestra-revista.pptx.asset.json";
import tallerNuestraRevistaPdf from "@/assets/docs/taller-nuestra-revista-pdf.pdf.asset.json";

// Miniaturas (primera página de cada documento)
import thumbInforme62 from "@/assets/docs/thumbs/informe-62-csg.jpg.asset.json";
import thumbIP from "@/assets/docs/thumbs/informacion-publica.jpg.asset.json";
import thumbInventario from "@/assets/docs/thumbs/inventario-grupo.jpg.asset.json";
import thumbActoEscribir from "@/assets/docs/thumbs/acto-escribir.jpg.asset.json";
import thumbAutomantenimiento from "@/assets/docs/thumbs/automantenimiento.jpg.asset.json";
import thumbHistoriaRevista from "@/assets/docs/thumbs/historia-revista.jpg.asset.json";
import thumbNuestraRevista from "@/assets/docs/thumbs/nuestra-revista.jpg.asset.json";




// Manual de Imagen Corporativa
import manualImagen from "@/assets/docs/manual-imagen-corporativa.pdf.asset.json";
import thumbManualImagen from "@/assets/docs/thumbs/manual-imagen-corporativa.jpg.asset.json";

export const Route = createFileRoute("/miembros/documentos")({
  head: () => ({
    meta: [
      { title: "Biblioteca Digital · Portal para Miembros" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: DocumentosPage,
});

type CategoryKey = "informes" | "talleres" | "formatos" | "manual";

const categories: Record<
  CategoryKey,
  { emoji: string; label: string; title: string; intro: string }
> = {
  informes: {
    emoji: "📄",
    label: "Informe",
    title: "Informes",
    intro:
      "Informes de servidores, comités, asambleas y demás documentos oficiales relacionados con la administración y el servicio del Área.",
  },
  talleres: {
    emoji: "🎓",
    label: "Taller",
    title: "Talleres",
    intro:
      "Material de formación y capacitación para grupos, servidores y comités. Esta sección se actualiza de forma continua con nuevos talleres.",
  },
  formatos: {
    emoji: "📝",
    label: "Formato",
    title: "Formatos",
    intro:
      "Formularios, actas, solicitudes y formatos oficiales utilizados por los grupos, comités y servidores del Área.",
  },
  manual: {
    emoji: "🎨",
    label: "Manual",
    title: "Manual de Imagen Corporativa",
    intro:
      "Documento de referencia institucional sobre el uso correcto del logotipo, los colores y demás elementos de identidad de Alcohólicos Anónimos. Aquí se publica siempre la versión vigente.",
  },
};

type Doc = {
  title: string;
  description: string;
  /** Archivo original para descargar */
  href: string;
  /** Versión PDF para la vista previa (si el original no es PDF) */
  previewUrl?: string;
  /** Miniatura de la primera página */
  thumb?: string;
  /** Mostrar la miniatura completa, sin recortar (conserva las proporciones) */
  thumbContain?: boolean;
  category: CategoryKey;
  fileType: "PDF" | "PowerPoint" | "Imagen";
  pages?: string;
  publishedAt: string;
  /** Versión vigente del documento (para documentos que se actualizan) */
  version?: string;
};

const documents: Doc[] = [
  {
    title:
      "Informe Final de la 62.ª Reunión Anual de la Conferencia de Servicios Generales",
    description:
      "Resumen de las recomendaciones, acciones y conclusiones aprobadas durante la 62.ª Reunión Anual de la Conferencia de Servicios Generales. Útil para conocer las decisiones que orientan el servicio en Colombia.",
    href: informe62.url,
    thumb: thumbInforme62.url,
    category: "informes",
    fileType: "PDF",
    pages: "216 páginas",
    publishedAt: "2026",
  },
  {
    title: "Informe del Delegado",
    description:
      "Informe del Delegado del Área 2 correspondiente al mes de julio de 2026, presentado en la Asamblea del 9 de agosto de 2026.",
    href: informeDelegado.url,
    thumb: informeDelegado.url,
    thumbContain: true,
    category: "informes",
    fileType: "Imagen",
    publishedAt: "9 de agosto de 2026",
  },
  {
    title: "Informe del Coordinador",
    description:
      "Informe del Coordinador del Comité de Área 2 presentado en la asamblea informativa del 9 de agosto de 2026.",
    href: informeCoordinador.url,
    thumb: informeCoordinador.url,
    thumbContain: true,
    category: "informes",
    fileType: "Imagen",
    publishedAt: "9 de agosto de 2026",
  },
  {
    title: "Informe de CCP — Cooperación con la Comunidad Profesional",
    description:
      "Informe del Comité de Cooperación con la Comunidad Profesional sobre la elaboración de la página web oficial del Área 2.",
    href: informeCCP.url,
    thumb: informeCCP.url,
    thumbContain: true,
    category: "informes",
    fileType: "Imagen",
    publishedAt: "9 de agosto de 2026",
  },
  {
    title: "Taller de Información Pública",
    description:
      "Guía de trabajo para preparar y desarrollar actividades de Información Pública. Explica el propósito del comité, las pautas de anonimato y ejemplos prácticos para llevar el mensaje a la comunidad.",
    href: tallerIP.url,
    thumb: thumbIP.url,
    category: "talleres",
    fileType: "PDF",
    pages: "36 páginas",
    publishedAt: "2022",
  },
  {
    title: "Taller de Inventario de Grupo",
    description:
      "Presentación de apoyo para realizar el inventario del grupo. Reúne las preguntas guía y los criterios de evaluación que ayudan al grupo a revisar su funcionamiento y su fidelidad a las Tradiciones.",
    href: tallerInventario.url,
    previewUrl: tallerInventarioPdf.url,
    thumb: thumbInventario.url,
    category: "talleres",
    fileType: "PowerPoint",
    pages: "27 diapositivas",
    publishedAt: "2019",
  },
  {
    title: "Taller de Automantenimiento",
    description:
      "Taller sobre la Séptima Tradición y la responsabilidad económica de los grupos: el sentido espiritual del automantenimiento, la distribución de las contribuciones y el sostenimiento de la estructura de servicio.",
    href: tallerAutomantenimiento.url,
    previewUrl: tallerAutomantenimientoPdf.url,
    thumb: thumbAutomantenimiento.url,
    category: "talleres",
    fileType: "PowerPoint",
    pages: "33 diapositivas",
    publishedAt: "3 de agosto de 2026",
  },
  {
    title: "El acto de escribir — AA El Mensaje",
    description:
      "Documento de apoyo para animar a los miembros a compartir su experiencia por escrito en la revista AA El Mensaje: recomendaciones de estilo, anonimato y pasos para enviar una colaboración.",
    href: tallerActoEscribir.url,
    thumb: thumbActoEscribir.url,
    category: "talleres",
    fileType: "PDF",
    pages: "6 páginas",
    publishedAt: "3 de agosto de 2026",
  },
  {
    title: "Nuestra revista AA El Mensaje",
    description:
      "Presentación sobre la revista AA El Mensaje: su propósito dentro de la Comunidad, su contenido y la manera en que los grupos pueden apoyarla y utilizarla como herramienta para llevar el mensaje.",
    href: tallerNuestraRevista.url,
    previewUrl: tallerNuestraRevistaPdf.url,
    thumb: thumbNuestraRevista.url,
    category: "talleres",
    fileType: "PowerPoint",
    pages: "11 diapositivas",
    publishedAt: "3 de agosto de 2026",
  },
  {
    title: "Historia de la revista AA El Mensaje",
    description:
      "Recorrido histórico por la revista AA El Mensaje: sus orígenes, su evolución y su papel como medio de comunicación entre los grupos de Alcohólicos Anónimos en Colombia.",
    href: tallerHistoriaRevista.url,
    previewUrl: tallerHistoriaRevistaPdf.url,
    thumb: thumbHistoriaRevista.url,
    category: "talleres",
    fileType: "PowerPoint",
    pages: "11 diapositivas",
    publishedAt: "3 de agosto de 2026",
  },
  {
    title: "Manual de Imagen Corporativa",
    description:
      "Manual oficial de identidad visual de Alcohólicos Anónimos: uso correcto del logotipo, proporciones, colores institucionales, tipografía y aplicaciones autorizadas en piezas de comunicación y servicio.",
    href: manualImagen.url,
    thumb: thumbManualImagen.url,
    thumbContain: true,
    category: "manual",
    fileType: "PDF",
    pages: "15 páginas",
    publishedAt: "2012",
    version: "Versión vigente",
  },
];

const filters: { key: "todos" | CategoryKey; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "informes", label: "📄 Informes" },
  { key: "talleres", label: "🎓 Talleres" },
  { key: "formatos", label: "📝 Formatos" },
  { key: "manual", label: "🎨 Manual de Imagen" },
];

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function DocumentosPage() {
  const [activeDoc, setActiveDoc] = useState<Doc | null>(null);
  const [filter, setFilter] = useState<"todos" | CategoryKey>("todos");
  const [query, setQuery] = useState("");

  const order: CategoryKey[] = ["informes", "talleres", "formatos", "manual"];
  const visibleCategories = filter === "todos" ? order : [filter];

  const matches = (doc: Doc) => {
    const q = normalize(query.trim());
    if (!q) return true;
    return (
      normalize(doc.title).includes(q) || normalize(doc.description).includes(q)
    );
  };

  const totalResults = documents.filter(
    (d) => (filter === "todos" || d.category === filter) && matches(d),
  ).length;

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <MemberPageHeader
        title="Biblioteca Digital"
        intro="Informes, talleres y formatos de servicio del Área 2 Metropolitana de Barranquilla, organizados por categoría para su consulta y descarga."
      />

      <div className="space-y-4">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-brand/50"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre del documento…"
            aria-label="Buscar documentos por nombre"
            className="w-full rounded-full border border-brand/15 bg-paper py-3 pl-11 pr-4 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-ink/45 focus:border-brand/40"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
          {filters.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
                  active
                    ? "border-brand bg-brand text-paper"
                    : "border-brand/20 bg-paper text-brand hover:bg-brand/10"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {totalResults === 0 && (
        <p className="rounded-2xl border border-dashed border-brand/20 bg-paper/60 p-6 text-sm leading-relaxed text-ink/70">
          No encontramos documentos que coincidan con tu búsqueda. Intenta con otra
          palabra o selecciona otra categoría.
        </p>
      )}

      <div className="space-y-14">
        {visibleCategories.map((key) => {
          const cat = categories[key];
          const docs = documents.filter((d) => d.category === key).filter(matches);
          if (query.trim() && docs.length === 0) return null;
          return (
            <CategorySection key={key} id={key} emoji={cat.emoji} title={cat.title} intro={cat.intro}>
              {docs.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {docs.map((doc) => (
                    <DocumentCard key={doc.title} doc={doc} onPreview={setActiveDoc} />
                  ))}
                </div>
              ) : (
                <p className="rounded-2xl border border-dashed border-brand/20 bg-paper/60 p-6 text-sm leading-relaxed text-ink/70">
                  Aún no hay documentos publicados en esta categoría. A medida que sean
                  aprobados, se incorporarán aquí para su consulta y descarga.
                </p>
              )}
            </CategorySection>
          );
        })}
      </div>

      <PreviewDialog doc={activeDoc} onClose={() => setActiveDoc(null)} />
    </div>
  );
}


function CategorySection({
  id,
  emoji,
  title,
  intro,
  children,
}: {
  id?: string;
  emoji: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="mb-3 flex items-center gap-3 font-serif text-2xl leading-tight text-brand sm:text-3xl">
        <span aria-hidden className="text-2xl">
          {emoji}
        </span>
        {title}
      </h2>
      {intro && (
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-ink/75">{intro}</p>
      )}
      {children}
    </section>
  );
}

function CategoryBadge({ category }: { category: CategoryKey }) {
  const cat = categories[category];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-brand">
      <span aria-hidden>{cat.emoji}</span>
      {cat.label}
    </span>
  );
}

function Metadata({ doc }: { doc: Doc }) {
  const items = [doc.fileType, doc.pages, doc.version].filter(Boolean) as string[];
  return (
    <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink/55">
      <li className="flex items-center gap-1.5">
        <CalendarDays className="size-3.5 text-brand/50" aria-hidden />
        {doc.publishedAt}
      </li>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3">
          <span aria-hidden className="text-brand/30">
            ·
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Thumbnail({ doc }: { doc: Doc }) {
  return (
    <div className="mb-5 overflow-hidden rounded-2xl border border-brand/10 bg-brand-soft/30">
      {doc.thumb ? (
        <img
          src={doc.thumb}
          alt={`Primera página de ${doc.title}`}
          loading="lazy"
          className={
            doc.thumbContain
              ? "h-44 w-full bg-paper object-contain"
              : "h-44 w-full object-cover object-top"
          }
        />
      ) : (
        <div className="grid h-44 w-full place-items-center text-brand/40">
          <FileText className="size-10" aria-hidden />
        </div>
      )}
    </div>
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
    <article className="card-aa flex flex-col">
      <Thumbnail doc={doc} />
      <CategoryBadge category={doc.category} />
      <h3 className="mt-3 font-serif text-lg leading-snug text-brand">{doc.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/75">
        {doc.description}
      </p>
      <Metadata doc={doc} />
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onPreview(doc)}
          className="btn-aa"
        >
          <Eye className="size-4" /> Ver
        </button>
        <a
          href={doc.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-aa-outline"
        >
          <Download className="size-4" /> Descargar
        </a>
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
  const isMobile = useIsMobile();
  const isImage = doc?.fileType === "Imagen";
  const previewSrc = doc
    ? (doc.previewUrl ?? (doc.fileType === "PowerPoint" ? null : doc.href))
    : null;
  const canEmbed = !!previewSrc && (isImage || !isMobile);

  return (
    <Dialog open={!!doc} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto rounded-2xl bg-paper">
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
            <div className="flex flex-wrap items-center gap-3">
              <CategoryBadge category={doc.category} />
            </div>
            <Metadata doc={doc} />
            {canEmbed ? (
              <div className="mt-2 overflow-hidden rounded-2xl border border-brand/10 bg-brand-soft/30">
                {isImage ? (
                  <img
                    src={previewSrc!}
                    alt={`Vista completa de ${doc.title}`}
                    className="max-h-[70vh] w-full bg-paper object-contain"
                  />
                ) : (
                  <object
                    data={`${previewSrc}#page=1&toolbar=0&navpanes=0`}
                    type="application/pdf"
                    className="h-[55vh] w-full"
                    aria-label={`Vista previa de ${doc.title}`}
                  >
                    <FallbackCard doc={doc} previewSrc={previewSrc} />
                  </object>
                )}
              </div>
            ) : (
              <div className="mt-2">
                <FallbackCard doc={doc} previewSrc={previewSrc} />
              </div>
            )}
            <div className="mt-2 flex flex-wrap gap-3">
              {previewSrc && (
                <a
                  href={previewSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-aa"
                >
                  <ExternalLink className="size-4" /> Ver documento
                </a>
              )}
              <a
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-aa-outline"
              >
                <Download className="size-4" /> Descargar {doc.fileType === "PDF" ? "PDF" : "archivo"}
              </a>
            </div>

          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function FallbackCard({ doc, previewSrc }: { doc: Doc; previewSrc: string | null }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-brand/10 bg-brand-soft/30 p-6 text-center sm:flex-row sm:text-left">
      <div className="w-28 shrink-0 overflow-hidden rounded-xl border border-brand/10 bg-paper">
        {doc.thumb ? (
          <img
            src={doc.thumb}
            alt={`Primera página de ${doc.title}`}
            loading="lazy"
            className={
              doc.thumbContain
                ? "h-36 w-full bg-paper object-contain"
                : "h-36 w-full object-cover object-top"
            }
          />
        ) : (
          <div className="grid h-36 w-full place-items-center text-brand/40">
            <FileText className="size-10" aria-hidden />
          </div>
        )}
      </div>
      <div className="flex-1">
        <p className="font-serif text-base leading-snug text-brand">{doc.title}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">
          Tu navegador no puede mostrar la vista previa aquí. Ábrelo en una pestaña
          nueva o descárgalo para consultarlo completo.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
          {previewSrc && (
            <a
              href={previewSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-aa"
            >
              <ExternalLink className="size-4" /> Ver documento
            </a>
          )}
          <a
            href={doc.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-aa-outline"
          >
            <Download className="size-4" /> Descargar {doc.fileType === "PDF" ? "PDF" : "archivo"}
          </a>
        </div>
      </div>
    </div>
  );
}

