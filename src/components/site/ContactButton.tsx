import { useState } from "react";
import { MessageCircle, Phone, Send, ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { contactConfig, whatsappLink, telLink } from "@/lib/contact-config";

type View = "menu" | "form" | "sent";

export function ContactButton() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("menu");

  const handleOpenChange = (v: boolean) => {
    setOpen(v);
    if (!v) setTimeout(() => setView("menu"), 200);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Hablar con un servidor de AA"
          className="fixed bottom-20 right-4 z-50 inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-full bg-paper px-3 py-3 text-sm font-semibold text-brand shadow-lift ring-1 ring-brand/20 transition-all hover:-translate-y-0.5 hover:bg-brand-tint focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30 sm:bottom-24 sm:right-6 sm:px-6 sm:py-3.5 sm:text-base"
        >
          <MessageCircle className="size-5" strokeWidth={2} aria-hidden />
          <span className="hidden sm:inline">Hablar con un servidor de AA</span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md rounded-3xl border-none bg-paper p-0 shadow-lift">
        {view === "menu" && (
          <MenuView onPickForm={() => setView("form")} />
        )}
        {view === "form" && (
          <FormView
            onBack={() => setView("menu")}
            onSent={() => setView("sent")}
          />
        )}
        {view === "sent" && <SentView onClose={() => handleOpenChange(false)} />}
      </DialogContent>
    </Dialog>
  );
}

function MenuView({ onPickForm }: { onPickForm: () => void }) {
  return (
    <div className="p-8">
      <DialogHeader className="mb-6 text-left">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-brand/60">
          Contacto humano
        </span>
        <DialogTitle className="font-serif text-2xl italic text-brand">
          Hablar con un servidor de AA
        </DialogTitle>
        <DialogDescription className="text-ink/70">
          Un miembro de Información Pública responderá personalmente. No hay
          bots ni respuestas automáticas.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-3">
        <a
          href={whatsappLink(
            "Hola, escribo desde el portal del Área 2 Metropolitana. Me gustaría hablar con un servidor de AA."
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-2xl border border-border bg-paper p-4 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand-tint hover:shadow-soft"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-paper">
            <MessageCircle className="size-6" strokeWidth={1.8} />
          </span>
          <span className="flex flex-col">
            <span className="font-serif text-lg italic text-brand">WhatsApp</span>
            <span className="text-sm text-ink/70">
              Escribir a un servidor de Información Pública.
            </span>
          </span>
        </a>

        <a
          href={telLink()}
          className="group flex items-center gap-4 rounded-2xl border border-border bg-paper p-4 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand-tint hover:shadow-soft"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-paper">
            <Phone className="size-6" strokeWidth={1.8} />
          </span>
          <span className="flex flex-col">
            <span className="font-serif text-lg italic text-brand">Llamar ahora</span>
            <span className="text-sm text-ink/70">{contactConfig.phoneDisplay}</span>
          </span>
        </a>

        <button
          type="button"
          onClick={onPickForm}
          className="group flex w-full items-center gap-4 rounded-2xl border border-border bg-paper p-4 text-left transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand-tint hover:shadow-soft"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-paper">
            <Send className="size-6" strokeWidth={1.8} />
          </span>
          <span className="flex flex-col">
            <span className="font-serif text-lg italic text-brand">Enviar un mensaje</span>
            <span className="text-sm text-ink/70">
              Déjanos tus datos y un servidor te contactará.
            </span>
          </span>
        </button>
      </div>

      <p className="mt-6 text-center text-xs text-ink/60">
        Se respeta el anonimato de quien busca ayuda.
      </p>
    </div>
  );
}

function FormView({
  onBack,
  onSent,
}: {
  onBack: () => void;
  onSent: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [municipality, setMunicipality] = useState<string>("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || !message.trim()) {
      toast.error("Por favor completa teléfono y mensaje.");
      return;
    }
    // Enrutamos el mensaje al WhatsApp del servidor mientras se conecta
    // el panel administrativo con almacenamiento propio.
    const body = [
      "Nuevo contacto desde el portal del Área 2 Metropolitana:",
      name.trim() ? `Nombre: ${name.trim()}` : "Nombre: (anónimo)",
      `Teléfono: ${phone.trim()}`,
      municipality ? `Municipio: ${municipality}` : null,
      "",
      "Mensaje:",
      message.trim(),
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappLink(body), "_blank", "noopener,noreferrer");
    onSent();
  };

  return (
    <form onSubmit={submit} className="p-8">
      <DialogHeader className="mb-6 text-left">
        <button
          type="button"
          onClick={onBack}
          className="mb-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand/70 hover:text-brand"
        >
          <ArrowLeft className="size-3.5" /> Volver
        </button>
        <DialogTitle className="font-serif text-2xl italic text-brand">
          Enviar un mensaje
        </DialogTitle>
        <DialogDescription className="text-ink/70">
          Un servidor de AA se pondrá en contacto contigo lo antes posible.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div>
          <Label htmlFor="c-name" className="text-brand">
            Nombre <span className="text-ink/50">(opcional)</span>
          </Label>
          <Input
            id="c-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5"
            autoComplete="off"
            maxLength={80}
          />
        </div>
        <div>
          <Label htmlFor="c-phone" className="text-brand">
            Teléfono
          </Label>
          <Input
            id="c-phone"
            required
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1.5"
            autoComplete="tel"
            maxLength={30}
          />
        </div>
        <div>
          <Label htmlFor="c-muni" className="text-brand">
            Municipio
          </Label>
          <Select value={municipality} onValueChange={setMunicipality}>
            <SelectTrigger id="c-muni" className="mt-1.5">
              <SelectValue placeholder="Selecciona un municipio" />
            </SelectTrigger>
            <SelectContent>
              {contactConfig.municipalities.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="c-msg" className="text-brand">
            Mensaje
          </Label>
          <Textarea
            id="c-msg"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1.5 min-h-28"
            maxLength={800}
            placeholder="Cuéntanos brevemente en qué podemos ayudarte."
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-paper shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brand-soft"
      >
        <Send className="size-4" />
        Enviar mensaje
      </button>
      <p className="mt-3 text-center text-xs text-ink/60">
        Al enviar aceptas que un servidor de AA te contacte por el medio que
        indicaste.
      </p>
    </form>
  );
}

function SentView({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-10 text-center">
      <div className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-brand/10 text-brand">
        <Send className="size-6" strokeWidth={1.8} />
      </div>
      <DialogTitle className="mb-2 font-serif text-2xl italic text-brand">
        Mensaje enviado
      </DialogTitle>
      <DialogDescription className="text-ink/70">
        Un servidor de Alcohólicos Anónimos te contactará en breve. Gracias por
        dar el primer paso.
      </DialogDescription>
      <button
        type="button"
        onClick={onClose}
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-brand/25 px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.15em] text-brand hover:bg-brand hover:text-paper"
      >
        Cerrar
      </button>
    </div>
  );
}
