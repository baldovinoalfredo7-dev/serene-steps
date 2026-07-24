import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { MemberPageHeader } from "@/components/miembros/SectionCard";

export const Route = createFileRoute("/miembros/principios/doce-tradiciones")({
  head: () => ({
    meta: [
      { title: "Las Doce Tradiciones · Portal para Miembros" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: DoceTradicionesPage,
});

const tradiciones: string[] = [
  "Nuestro bienestar común debe tener la preferencia; la recuperación personal depende de la unidad de A.A.",
  "Para el propósito de nuestro grupo solo existe una autoridad fundamental: un Dios amoroso tal como se exprese en la conciencia de nuestro grupo. Nuestros líderes no son sino servidores de confianza; no gobiernan.",
  "El único requisito para ser miembro de A.A. es querer dejar de beber.",
  "Cada grupo debe ser autónomo, excepto en asuntos que afecten a otros grupos o a Alcohólicos Anónimos considerado como un todo.",
  "Cada grupo tiene un solo objetivo primordial: llevar el mensaje al alcohólico que aún está sufriendo.",
  "Un grupo de A.A. nunca debe respaldar, financiar o prestar el nombre de A.A. a ninguna entidad allegada o empresa ajena, para evitar que los problemas de dinero, propiedad y prestigio nos desvíen de nuestro objetivo primordial.",
  "Cada grupo de A.A. debe mantenerse completamente a sí mismo, negándose a recibir contribuciones de afuera.",
  "Alcohólicos Anónimos nunca tendrá carácter profesional, pero nuestros centros de servicio pueden emplear trabajadores especiales.",
  "A.A. como tal nunca debe ser organizada; pero podemos crear juntas o comités de servicio que sean directamente responsables ante aquellos a quienes sirven.",
  "Alcohólicos Anónimos no tiene opinión acerca de asuntos ajenos a sus actividades; por consiguiente su nombre nunca debe mezclarse en polémicas públicas.",
  "Nuestra política de relaciones públicas se basa más bien en la atracción que en la promoción; necesitamos mantener siempre el anonimato personal ante la prensa, la radio y el cine.",
  "El anonimato es la base espiritual de todas nuestras Tradiciones, recordándonos siempre anteponer los principios a las personalidades.",
];

function DoceTradicionesPage() {
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
        title="Las Doce Tradiciones de Alcohólicos Anónimos"
        intro="Las Doce Tradiciones orientan la vida de los grupos y preservan la unidad de Alcohólicos Anónimos."
      />
      <section
        aria-label="Texto oficial de las Doce Tradiciones"
        className="rounded-3xl border border-brand/10 bg-paper p-6 sm:p-8 shadow-sm"
      >
        <ol className="space-y-6">
          {tradiciones.map((texto, i) => (
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
