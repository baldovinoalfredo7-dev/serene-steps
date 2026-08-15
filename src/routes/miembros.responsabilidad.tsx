import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ZoomIn } from "lucide-react";
import { MemberPageHeader } from "@/components/miembros/SectionCard";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import declaracionAsset from "@/assets/declaracion-responsabilidad.png.asset.json";

export const Route = createFileRoute("/miembros/responsabilidad")({
  head: () => ({
    meta: [
      { title: "Declaración de la Responsabilidad · Portal para Miembros" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: DeclaracionResponsabilidadPage,
});

function DeclaracionResponsabilidadPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <MemberPageHeader
        title="Declaración de la Responsabilidad"
        intro="Yo soy responsable... Cuando cualquiera, dondequiera extiende su mano pidiendo ayuda, yo quiero que la mano de A.A. esté siempre allí."
      />

      <article className="card-aa overflow-hidden p-0">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          aria-label="Ver la Declaración de la Responsabilidad en tamaño completo"
        >
          <img
            src={declaracionAsset.url}
            alt="Declaración de la Responsabilidad de Alcohólicos Anónimos"
            className="w-full"
            loading="lazy"
          />
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-brand/90 px-3 py-1.5 text-[0.7rem] font-semibold text-paper opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <ZoomIn className="size-3.5" aria-hidden /> Ampliar
          </span>
        </button>
      </article>

      <Dialog open={open} onOpenChange={(v) => !v && setOpen(false)}>
        <DialogContent className="max-h-[92dvh] max-w-4xl overflow-y-auto rounded-2xl bg-paper p-4 sm:p-6">
          <DialogTitle className="pr-10 font-serif text-lg italic text-brand">
            Declaración de la Responsabilidad
          </DialogTitle>
          <DialogDescription className="text-xs text-ink/70">
            Declaración de la Convención Internacional del Trigésimo
            Aniversario, 1965, Toronto, Canadá.
          </DialogDescription>
          <img
            src={declaracionAsset.url}
            alt="Declaración de la Responsabilidad de Alcohólicos Anónimos"
            className="mt-3 w-full rounded-xl object-contain"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
