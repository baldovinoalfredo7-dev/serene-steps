import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { MemberPageHeader } from "@/components/miembros/SectionCard";

export const Route = createFileRoute("/miembros/oraciones/septimo-paso")({
  head: () => ({
    meta: [
      { title: "Oración del Séptimo Paso · Portal para Miembros" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: SeptimoPasoPage,
});

const versos: string[] = [
  "Creador mío,",
  "estoy dispuesto a que tomes todo lo que soy, bueno y malo.",
  "Te ruego que elimines de mí cada uno de los defectos de carácter que me obstaculizan en el camino para que logre ser útil a Ti y a mis semejantes.",
  "Dame la fortaleza para que al salir de aquí cumpla con Tu voluntad.",
  "Amén.",
];

function SeptimoPasoPage() {
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
        title="Oración del Séptimo Paso"
      />
      <section
        aria-label="Texto oficial de la Oración del Séptimo Paso"
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
