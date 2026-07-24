import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { MemberPageHeader } from "@/components/miembros/SectionCard";

export const Route = createFileRoute("/miembros/principios/doce-conceptos")({
  head: () => ({
    meta: [
      { title: "Los Doce Conceptos para el Servicio Mundial · Portal para Miembros" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: DoceConceptosPage,
});

const conceptos: { numero: string; texto: string }[] = [
  {
    numero: "I",
    texto:
      "La responsabilidad final y la autoridad fundamental de los servicios mundiales de A.A. residir deben siempre en la conciencia colectiva de toda nuestra Comunidad.",
  },
  {
    numero: "II",
    texto:
      "La Conferencia de Servicios Generales de A.A. se ha convertido, en casi todos los aspectos, en la voz activa y la conciencia efectiva de toda nuestra Comunidad en sus asuntos mundiales.",
  },
  {
    numero: "III",
    texto:
      "Para asegurar su dirección eficaz, debemos dotar a cada elemento de A.A. — la Conferencia, la Junta de Servicios Generales, y sus distintas corporaciones de servicio, personal directivo, comités y ejecutivos — de un \u201CDerecho de Decisión\u201D tradicional.",
  },
  {
    numero: "IV",
    texto:
      "Nosotros debemos mantener, a todos los niveles de responsabilidad, un \u201CDerecho de Participación\u201D tradicional, ocupándonos de que a cada clasificación o grupo de nuestros servidores mundiales les sea permitida una representación con voto, en proporción razonable a la responsabilidad que cada uno tenga que desempeñar.",
  },
  {
    numero: "V",
    texto:
      "En toda nuestra estructura de servicio mundial, un \u201CDerecho de Apelación\u201D tradicional debe prevalecer, asegurándonos así que se escuche la opinión de la minoría, y que las peticiones de rectificación de los agravios personales serán consideradas cuidadosamente.",
  },
  {
    numero: "VI",
    texto:
      "La Conferencia reconoce también que la principal iniciativa y la responsabilidad activa en la mayoría de estos asuntos, debe ser ejercida en primer lugar por los miembros custodios de la Conferencia, cuando ellos actúan como la Junta de Servicios Generales de Alcohólicos Anónimos.",
  },
  {
    numero: "VII",
    texto:
      "La Carta Constitutiva y los Estatutos son instrumentos legales, y los custodios están, por consiguiente, totalmente autorizados para administrar y dirigir todos los asuntos de servicios. La Carta de la Conferencia en sí misma no es un instrumento legal, se apoya en la fuerza de la tradición y en las finanzas de A.A. para su eficacia.",
  },
  {
    numero: "VIII",
    texto:
      "Los Custodios son los principales planificadores y administradores de los grandes asuntos de política y finanzas globales. Con respecto a nuestros servicios constantemente activos e incorporados separadamente, los Custodios, como síndicos fiscales, ejercen una función de supervisión administrativa, por medio de su facultad de elegir a todos los directores de estas entidades.",
  },
  {
    numero: "IX",
    texto:
      "Buenos directores de servicio en todos los niveles son indispensables para nuestro funcionamiento y seguridad en el futuro. La dirección básica del servicio mundial que una vez ejercieron los fundadores de Alcohólicos Anónimos, tiene necesariamente que ser asumida por los Custodios.",
  },
  {
    numero: "X",
    texto:
      "A cada responsabilidad de servicio, le debe corresponder una autoridad de servicio equivalente, y el alcance de tal autoridad debe estar siempre bien definido.",
  },
  {
    numero: "XI",
    texto:
      "Los Custodios deben siempre contar con los mejores comités permanentes y con directores de las corporaciones de servicio, ejecutivos, personal de oficina y consejeros bien capacitados. La composición, cualidades, procedimientos de iniciación y derechos y obligaciones serán siempre asuntos de verdadero interés.",
  },
  {
    numero: "XII",
    texto:
      "La Conferencia cumplirá con el espíritu de las Tradiciones de A.A., teniendo especial cuidado de que la Conferencia nunca se convierta en sede de peligrosa riqueza o poder; que fondos suficientes para su funcionamiento, más una reserva adecuada, sean su prudente principio financiero, que ninguno de los miembros de la Conferencia sea nunca colocado en una posición de autoridad desmedida sobre ninguno de los otros, que se llegue a todas las decisiones importantes por discusión, votación y, siempre que sea posible, por unanimidad substancial; que ninguna actuación de la Conferencia sea punitiva a personas, o una incitación a controversia pública; que la Conferencia nunca deba realizar ninguna acción de gobierno autoritaria, y que como la Sociedad de Alcohólicos Anónimos, a la cual sirve, la Conferencia en sí misma siempre permanezca democrática en pensamiento y en acción.",
  },
];

function DoceConceptosPage() {
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
        title="Los Doce Conceptos para el Servicio Mundial (Forma corta)"
        intro="Los Doce Conceptos ofrecen principios para el ejercicio responsable del servicio dentro de la estructura de Alcohólicos Anónimos."
      />
      <section
        aria-label="Texto oficial de los Doce Conceptos"
        className="rounded-3xl border border-brand/10 bg-paper p-6 sm:p-8 shadow-sm"
      >
        <ol className="space-y-6">
          {conceptos.map((c) => (
            <li key={c.numero} className="flex gap-4">
              <span
                aria-hidden
                className="grid min-w-9 shrink-0 place-items-center rounded-full bg-brand/10 px-3 py-1 font-serif text-base font-semibold text-brand"
              >
                {c.numero}
              </span>
              <p className="pt-1 text-base leading-relaxed text-ink/85">{c.texto}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
