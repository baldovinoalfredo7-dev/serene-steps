import { useState } from "react";
import { MessageCircle, Phone, LifeBuoy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { whatsappLink, telLink } from "@/lib/contact-config";

export function HelpButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="btn-aa fixed bottom-3 right-3 z-40 min-h-10 text-xs ring-1 ring-paper/20 transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40 sm:bottom-6 sm:right-6 sm:min-h-12 sm:gap-2 sm:px-6 sm:py-3.5 sm:text-base"
          aria-label="Necesito ayuda ahora"
        >
          <span className="relative flex size-2 shrink-0 sm:size-2.5" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-paper/70 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-paper sm:size-2.5" />
          </span>
          <LifeBuoy className="size-3.5 sm:size-5" strokeWidth={2} aria-hidden />
          Necesito ayuda ahora
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-sm rounded-2xl border-none bg-paper p-0 shadow-lift sm:max-w-md">
        <div className="p-6 sm:p-8">
          <DialogHeader className="mb-6 text-left">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-brand/60">
              Contacto humano
            </span>
            <DialogTitle className="font-serif text-2xl italic text-brand">
              Estamos aquí para escucharte
            </DialogTitle>
            <DialogDescription className="text-ink/70">
              Si deseas hablar con alguien de nuestra comunidad, puedes escribirnos
              por WhatsApp o llamar directamente a nuestra oficina.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <a
              href={whatsappLink(
                "Hola, escribo desde el portal del Área 2 Metropolitana. Me gustaría hablar con alguien de la comunidad."
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-aa min-h-14 w-full justify-start gap-4 px-4 text-left"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-paper/20 text-paper">
                <MessageCircle className="size-6" strokeWidth={1.8} />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-semibold uppercase tracking-[0.12em] sm:text-base">
                  WhatsApp
                </span>
                <span className="text-xs opacity-90 sm:text-sm">Escribir ahora</span>
              </span>
            </a>

            <a
              href={telLink()}
              onClick={() => setOpen(false)}
              className="btn-aa-outline min-h-14 w-full justify-start gap-4 px-4 text-left"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                <Phone className="size-6" strokeWidth={1.8} />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-semibold uppercase tracking-[0.12em] sm:text-base">
                  Llamar a la oficina
                </span>
                <span className="text-xs text-ink/70 sm:text-sm">Llamar ahora</span>
              </span>
            </a>
          </div>

          <p className="mt-5 text-center text-xs text-ink/60">
            Se respeta el anonimato de quien busca ayuda.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
