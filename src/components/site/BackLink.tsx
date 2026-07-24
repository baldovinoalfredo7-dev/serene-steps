import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function BackLink({ to, label = "Volver" }: { to: string; label?: string }) {
  return (
    <div className="border-b border-brand/10 bg-paper/60">
      <div className="mx-auto max-w-5xl px-6 py-4">
        <Link
          to={to}
          className="inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-brand/70"
        >
          <ArrowLeft className="size-4" />
          {label}
        </Link>
      </div>
    </div>
  );
}
