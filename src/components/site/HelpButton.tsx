import { Link } from "@tanstack/react-router";

export function HelpButton() {
  return (
    <Link
      to="/necesito-ayuda"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-medium text-paper shadow-xl ring-2 ring-brand transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40"
      aria-label="Necesito ayuda ahora"
    >
      <span className="block size-2 rounded-full bg-blue-300 animate-pulse" aria-hidden />
      Necesito ayuda ahora
    </Link>
  );
}
