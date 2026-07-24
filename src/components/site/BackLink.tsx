import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function BackLink({ to, label = "Volver" }: { to: string; label?: string }) {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-6">
      <Link
        to={to}
        className="inline-flex items-center gap-2 text-sm font-medium text-brand/80 transition-colors hover:text-brand"
      >
        <ArrowLeft className="size-4" />
        {label}
      </Link>
    </div>
  );
}
