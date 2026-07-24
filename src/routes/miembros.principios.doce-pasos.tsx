import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { MemberPageHeader } from "@/components/miembros/SectionCard";

export const Route = createFileRoute("/miembros/principios/doce-pasos")({
  head: () => ({
    meta: [
      { title: "Los Doce Pasos · Portal para Miembros" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: DocePasosPage,
});

const pasos: string[] = [
  "Admitimos que éramos impotentes ante el alcohol, que nuestras vidas se habían vuelto ingobernables.",
  "Llegamos a creer que un Poder superior a nosotros mismos podría devolvernos el sano juicio.",
  "Decidimos poner nuestras voluntades y nuestras vidas al cuidado de Dios, como nosotros lo concebimos.",
  "Sin temor hicimos un minucioso inventario moral de nosotros mismos.",
  "Admitimos ante Dios, ante nosotros mismos, y ante otro ser humano, la naturaleza exacta de nuestros defectos.",
  "Estuvimos enteramente dispuestos a dejar que Dios nos liberase de nuestros defectos.",
  "Humildemente le pedimos que nos liberase de nuestros defectos.",
  "Hicimos una lista de todas aquellas personas a quienes habíamos ofendido y estuvimos dispuestos a reparar el daño que les causamos.",
  "Reparamos directamente a cuantos nos fue posible el daño causado, excepto cuando el hacerlo implicaba perjuicio para ellos o para otros.",
  "Continuamos haciendo nuestro inventario personal y cuando nos equivocábamos lo admitíamos inmediatamente.",
  "Buscamos a través de la oración y la meditación mejorar nuestro contacto consciente con Dios como nosotros lo concebimos, pidiéndole solamente que nos dejase conocer su voluntad para con nosotros y nos diese la fortaleza para cumplirla.",
  "Habiendo obtenido un despertar espiritual como resultado de estos pasos, tratamos de llevar el mensaje a los alcohólicos y de practicar estos principios en todos nuestros asuntos.",
];

function DocePasosPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Link
        to="/miembros/principios"
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
      >
        <ArrowLeft className="size-4" /> Volver a Los 36 principios
      </Link>
      <MemberPageHeader
        eyebrow="Los 36 principios"
        title="Los Doce Pasos de Alcohólicos Anónimos"
        intro="Los Doce Pasos constituyen el programa de recuperación personal de Alcohólicos Anónimos."
      />
      <section
        aria-label="Texto oficial de los Doce Pasos"
        className="rounded-3xl border border-brand/10 bg-paper p-6 sm:p-8 shadow-sm"
      >
        <ol className="space-y-6">
          {pasos.map((texto, i) => (
            <li key={i} className="flex gap-4">
              <span
                aria-hidden
                className="grid size-9 shrink-0 place-items-center rounded-full bg-brand/10 font-serif text-base font-semibold text-brand"
              >
                {i + 1}
              </span>
              <p className="pt-1 text-base leading-relaxed text-ink/85">{texto}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
