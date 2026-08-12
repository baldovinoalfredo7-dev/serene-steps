import { useState } from "react";
import { ImageIcon, Eye, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Flyer } from "@/lib/asambleas-data";

/**
 * Galería visual de los informes de la Asamblea. Cada tarjeta muestra la
 * imagen original del informe (PNG) y su título; al abrirla se ve completa
 * y puede descargarse sin modificar el archivo.
 */
export function FlyerGallery({ items }: { items: Flyer[] }) {
  const [open, setOpen] = useState<Flyer | null>(null);

  if (items.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-brand/20 bg-soft/50 px-5 py-6 text-sm text-ink/70">
        Aún no se han publicado informes en esta categoría. Se agregarán apenas
        estén disponibles.
      </p>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <li key={`${item.title}-${item.subtitle ?? ""}`}>
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-brand/10 bg-paper shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-lift">
              <button
                type="button"
                onClick={() => setOpen(item)}
                className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                aria-label={`Ver informe de ${item.title} en tamaño completo`}
              >
                <div className="aspect-[3/4] w-full overflow-hidden bg-soft">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={`Informe de ${item.title}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-brand/50">
                      <ImageIcon className="size-7" strokeWidth={1.5} />
                      <span className="px-3 text-center text-[0.65rem] uppercase tracking-[0.18em]">
                        Informe pendiente
                      </span>
                    </div>
                  )}
                </div>
              </button>
              <div className="flex flex-1 flex-col p-3">
                <p className="font-serif text-sm leading-snug text-brand">{item.title}</p>
                {item.subtitle && (
                  <p className="mt-1 text-xs text-ink/70">{item.subtitle}</p>
                )}
                <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink/55">
                  Formato: PNG
                </p>
                {item.image && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setOpen(item)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-brand bg-brand px-3 py-1.5 text-[0.7rem] font-semibold text-paper transition-colors hover:bg-brand-strong"
                    >
                      <Eye className="size-3.5" aria-hidden /> Ver informe
                    </button>
                    <a
                      href={item.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-brand/25 px-3 py-1.5 text-[0.7rem] font-semibold text-brand transition-colors hover:bg-brand/10"
                    >
                      <Download className="size-3.5" aria-hidden /> Descargar
                    </a>
                  </div>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>

      <Dialog open={open !== null} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent
          className="max-h-[92dvh] max-w-3xl overflow-y-auto rounded-2xl bg-paper p-4 sm:p-6"
        >
          <DialogTitle className="pr-10 font-serif text-lg italic text-brand">
            {open?.title}
          </DialogTitle>
          <DialogDescription className="text-xs text-ink/70">
            {open?.subtitle ?? "Informe presentado en la Asamblea de Área"}
          </DialogDescription>
          {open?.image ? (
            <img
              src={open.image}
              alt={`Informe de ${open.title}`}
              className="mt-3 w-full rounded-xl object-contain"
            />
          ) : (
            <p className="mt-3 rounded-xl bg-soft/60 px-4 py-8 text-center text-sm text-ink/70">
              Este informe aún no está disponible.
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-3">
            {open?.image && (
              <a
                href={open.image}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-aa"
              >
                <Download className="size-4" aria-hidden /> Descargar PNG
              </a>
            )}
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="btn-aa-outline"
            >
              Volver a la galería
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
