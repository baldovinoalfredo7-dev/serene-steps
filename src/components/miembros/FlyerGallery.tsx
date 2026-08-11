import { useState } from "react";
import { ImageIcon, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Flyer } from "@/lib/asambleas-data";

/**
 * Galería visual de flyers de informes. Cada tarjeta muestra la imagen del
 * flyer y su título; al tocarla se abre en tamaño grande con opción de volver.
 */
export function FlyerGallery({ items }: { items: Flyer[] }) {
  const [open, setOpen] = useState<Flyer | null>(null);

  if (items.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-brand/20 bg-soft/50 px-5 py-6 text-sm text-ink/70">
        Aún no se han publicado flyers en esta categoría. Se agregarán apenas estén
        disponibles.
      </p>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <li key={`${item.title}-${item.subtitle ?? ""}`}>
            <button
              type="button"
              onClick={() => setOpen(item)}
              className="group block w-full overflow-hidden rounded-2xl border border-brand/10 bg-paper text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              aria-label={`Ver informe de ${item.title} en tamaño completo`}
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-soft">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={`Flyer del informe de ${item.title}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-brand/50">
                    <ImageIcon className="size-7" strokeWidth={1.5} />
                    <span className="px-3 text-center text-[0.65rem] uppercase tracking-[0.18em]">
                      Flyer pendiente
                    </span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="font-serif text-sm leading-snug text-brand">{item.title}</p>
                {item.subtitle && (
                  <p className="mt-1 text-xs text-ink/70">{item.subtitle}</p>
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={open !== null} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent
          showCloseButton={false}
          className="max-h-[92dvh] max-w-3xl overflow-y-auto rounded-2xl bg-paper p-4 sm:p-6"
        >
          <DialogTitle className="pr-10 font-serif text-lg italic text-brand">
            {open?.title}
          </DialogTitle>
          <DialogDescription className="text-xs text-ink/70">
            {open?.subtitle ?? "Informe presentado en la Asamblea de Área"}
          </DialogDescription>
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="absolute right-3 top-3 rounded-full bg-soft p-2 text-brand hover:bg-brand hover:text-paper"
            aria-label="Volver a la galería"
          >
            <X className="size-4" />
          </button>
          {open?.image ? (
            <img
              src={open.image}
              alt={`Flyer del informe de ${open.title}`}
              className="mt-3 w-full rounded-xl object-contain"
            />
          ) : (
            <p className="mt-3 rounded-xl bg-soft/60 px-4 py-8 text-center text-sm text-ink/70">
              El flyer de este informe aún no está disponible.
            </p>
          )}
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="btn-aa-outline mt-4 self-start"
          >
            Volver a la galería
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
