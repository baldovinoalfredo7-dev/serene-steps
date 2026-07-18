import { Link } from "@tanstack/react-router";
import { LifeBuoy } from "lucide-react";

export function HelpButton() {
  return (
    <Link
      to="/necesito-ayuda"
      className="fixed bottom-4 right-4 z-50 inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-paper shadow-lift ring-1 ring-paper/20 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40 sm:bottom-6 sm:right-6 sm:px-6 sm:py-3.5 sm:text-base"
      aria-label="Necesito ayuda ahora"
    >
      <span className="relative flex size-2.5 shrink-0" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-paper/70 opacity-75" />
        <span className="relative inline-flex size-2.5 rounded-full bg-paper" />
      </span>
      <LifeBuoy className="size-4 sm:size-5" strokeWidth={2} aria-hidden />
      Necesito ayuda ahora
    </Link>
  );
}
