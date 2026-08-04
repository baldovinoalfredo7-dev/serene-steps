import { Link } from "@tanstack/react-router";
import { LifeBuoy } from "lucide-react";

export function HelpButton() {
  return (
    <Link
      to="/necesito-ayuda"
      className="btn-aa fixed bottom-3 right-3 z-40 min-h-10 text-xs ring-1 ring-paper/20 transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40 sm:bottom-6 sm:right-6 sm:min-h-12 sm:gap-2 sm:px-6 sm:py-3.5 sm:text-base"
      aria-label="Necesito ayuda ahora"
    >
      <span className="relative flex size-2 shrink-0 sm:size-2.5" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-paper/70 opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-paper sm:size-2.5" />
      </span>
      <LifeBuoy className="size-3.5 sm:size-5" strokeWidth={2} aria-hidden />
      Necesito ayuda ahora
    </Link>
  );
}
