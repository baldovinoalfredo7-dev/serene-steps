import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { MemberPageHeader } from "@/components/miembros/SectionCard";

export const Route = createFileRoute("/miembros/oraciones/tercer-paso")({
  head: () => ({
    meta: [
      { title: "Oración del Tercer Paso · Portal para Miembros" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: TercerPasoPage,
});

const versos: string[] = [
  "Dios, me ofrezco a Ti",
  "para que obres en mí",
  "y hagas conmigo Tu voluntad.",
  "Líbrame de mi propio encadenamiento del ego, para que pueda cumplir mejor con Tu voluntad.",
  "Líbrame de mis dificultades",
  "y que la victoria sobre ellas",
  "sea el testimonio,",
  "para aquellos a quien yo ayude,",
  "de Tu poder,",
  "Tu amor",
  "y la manera en que Tú quieres que vivamos.",
  "Que siempre haga Tu voluntad.",
  "Amén.",
];

function TercerPasoPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Link
        to="/miembros/oraciones"
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
      >
        <ArrowLeft className="size-4" /> Volver a Nuestras oraciones
      </Link>
      <MemberPageHeader
        eyebrow="Nuestras oraciones"
        title="Oración del Tercer Paso"
      />
      <section
        aria-label="Texto oficial de la Oración del Tercer Paso"
        className="rounded-3xl border border-brand/10 bg-paper p-6 sm:p-8 shadow-sm"
      >
        <div className="space-y-4 font-serif text-lg leading-relaxed text-ink/85 sm:text-xl">
          {versos.map((v, i) => (
            <p key={i}>{v}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
