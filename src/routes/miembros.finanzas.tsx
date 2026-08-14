import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Eye, Download, Maximize2, Wallet, ReceiptText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  presupuesto,
  informesMensuales,
  type FinanceDoc,
} from "@/lib/finanzas-data";

export const Route = createFileRoute("/miembros/finanzas")({
  head: () => ({
    meta: [
      { title: "Información Financiera del Área 2 · AA Área 2 Metropolitana" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: FinanzasPage,
});

function FinanzasPage() {
  const [open, setOpen] = useState<FinanceDoc | null>(null);

  return (
    <div className="mx-auto max-w-5xl space-y-14">
      <header className="max-w-3xl">
        <span className="mb-3 block text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand/80">
          Transparencia y servicio
        </span>
        <h1 className="font-serif text-3xl italic leading-tight text-brand sm:text-4xl">
          Información Financiera del Área 2
        </h1>
        <p className="mt-3 font-serif text-lg italic text-brand/80">
          La claridad financiera fortalece la confianza y el servicio.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink/80">
          En este espacio ponemos a disposición de los miembros información
          relacionada con la gestión de los recursos del Área 2 Metropolitana de
          Barranquilla, de manera clara y oportuna.
        </p>
      </header>

      <section id="presupuesto" aria-labelledby="presupuesto-h" className="space-y-5">
        <div className="border-b border-brand/10 pb-3">
          <h2
            id="presupuesto-h"
            className="flex items-center gap-2 font-serif text-xl italic text-brand"
          >
            <Wallet className="size-5 text-brand/70" aria-hidden />
            Presupuesto del Área
          </h2>
          <p className="mt-1 text-sm text-ink/70">
            Documento del presupuesto vigente.
          </p>
        </div>
        <DocCard doc={presupuesto} onOpen={setOpen} />
      </section>

      <section id="informes" aria-labelledby="informes-h" className="space-y-5">
        <div className="border-b border-brand/10 pb-3">
          <h2
            id="informes-h"
            className="flex items-center gap-2 font-serif text-xl italic text-brand"
          >
            <ReceiptText className="size-5 text-brand/70" aria-hidden />
            Informes Financieros Mensuales
          </h2>
          <p className="mt-1 text-sm text-ink/70">
            Informes de tesorería por mes, del más reciente al más antiguo.
          </p>
        </div>
        <div className="space-y-6">
          {informesMensuales.map((doc) => (
            <DocCard key={doc.id} doc={doc} onOpen={setOpen} />
          ))}
        </div>
      </section>

      <Dialog open={open !== null} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-h-[92dvh] max-w-4xl overflow-y-auto rounded-2xl bg-paper p-4 sm:p-6">
          <DialogTitle className="pr-10 font-serif text-lg italic text-brand">
            {open?.title}
          </DialogTitle>
          <DialogDescription className="text-xs text-ink/70">
            {open?.subtitle ?? "Documento financiero del Área 2"}
          </DialogDescription>
          {open && (
            <img
              src={open.image}
              alt={open.title}
              className="mt-3 w-full rounded-xl object-contain"
            />
          )}
          <div className="mt-4 flex flex-wrap gap-3">
            {open && (
              <a
                href={open.image}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-aa"
              >
                <Maximize2 className="size-4" aria-hidden /> Ver en tamaño completo
              </a>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DocCard({
  doc,
  onOpen,
}: {
  doc: FinanceDoc;
  onOpen: (doc: FinanceDoc) => void;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-brand/10 bg-paper shadow-soft">
      <button
        type="button"
        onClick={() => onOpen(doc)}
        className="group block w-full bg-soft/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        aria-label={`Ampliar ${doc.title}`}
      >
        <img
          src={doc.image}
          alt={doc.title}
          loading="lazy"
          className="mx-auto max-h-[70vh] w-full object-contain transition-transform duration-500 group-hover:scale-[1.01]"
        />
      </button>
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="min-w-0">
          <h3 className="font-serif text-base leading-snug text-brand sm:text-lg">
            {doc.title}
          </h3>
          {doc.subtitle && (
            <p className="mt-1 text-xs text-ink/70">{doc.subtitle}</p>
          )}
          <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink/55">
            Formato: {doc.format}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => onOpen(doc)} className="btn-aa">
            <Eye className="size-4" aria-hidden /> Ampliar
          </button>
          <a
            href={doc.image}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-aa-outline"
          >
            <Download className="size-4" aria-hidden /> Descargar
          </a>
        </div>
      </div>
    </article>
  );
}
