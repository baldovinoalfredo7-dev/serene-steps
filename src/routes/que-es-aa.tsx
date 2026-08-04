import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Users, HeartHandshake, BookOpen, DoorOpen, Sparkles, HelpCircle } from "lucide-react";
import type { ReactNode, ComponentType } from "react";

export const Route = createFileRoute("/que-es-aa")({
  head: () => ({
    meta: [
      { title: "¿Qué es Alcohólicos Anónimos? — AA Área 2 Metropolitana" },
      {
        name: "description",
        content:
          "Conoce qué es Alcohólicos Anónimos, quiénes pueden asistir, cómo funciona el programa y qué esperar de tu primera reunión.",
      },
      { property: "og:title", content: "¿Qué es Alcohólicos Anónimos?" },
      {
        property: "og:description",
        content:
          "Una explicación cercana sobre AA: quiénes somos, cómo funcionamos y qué encontrarás en tu primera reunión.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/que-es-aa" }],
  }),
  component: QueEsAA,
});

function QueEsAA() {
  return (
    <PageShell
      eyebrow="Conócenos"
      title="¿Qué es Alcohólicos Anónimos?"
      intro="Somos una comunidad de hombres y mujeres que compartimos nuestra experiencia, fortaleza y esperanza para resolver nuestro problema común y ayudar a otros a recuperarse del alcoholismo."
    >
      <div className="space-y-14">
        <Block icon={Users} title="¿Qué es Alcohólicos Anónimos?">
          <p>
            Alcohólicos Anónimos es una comunidad mundial, sin fines de lucro, formada por personas
            que se reúnen voluntariamente para mantenerse sobrias y ayudar a otros a lograr la
            sobriedad.
          </p>
          <p>
            El único requisito para ser miembro es el deseo de dejar la bebida. No hay cuotas ni
            honorarios; nos sostenemos con nuestras propias contribuciones.
          </p>
        </Block>

        <Block icon={DoorOpen} title="¿Quiénes pueden asistir?">
          <p>
            Cualquier persona que crea tener un problema con el alcohol es bienvenida. No importa
            la edad, la profesión, la religión o la condición social.
          </p>
          <p>
            AA no está afiliada a ninguna secta, religión, partido político, organización o
            institución. No opina sobre asuntos ajenos a su propósito principal.
          </p>
        </Block>

        <Block icon={BookOpen} title="¿Cómo funciona el programa?">
          <p>
            Nuestro programa de recuperación se basa en Doce Pasos sugeridos, un conjunto de
            principios espirituales que, practicados como forma de vida, permiten liberarnos del
            deseo de beber.
          </p>
          <p>
            Nos reunimos regularmente en grupos locales, donde compartimos experiencias y nos
            apoyamos mutuamente. La participación es totalmente voluntaria y anónima.
          </p>
        </Block>

        <Block icon={HeartHandshake} title="Qué ocurre en una primera reunión">
          <p>
            Al llegar a tu primera reunión encontrarás un ambiente sencillo y acogedor. No tienes
            que hablar si no lo deseas: basta con escuchar.
          </p>
          <p>
            Los compañeros compartirán su experiencia con el alcohol y cómo encontraron una forma
            de vida sin beber. Tu identidad se mantendrá siempre en el anonimato.
          </p>
          <p>
            Si quieres prepararte, puedes leer{" "}
            <Link to="/primera-reunion" className="font-medium text-brand underline underline-offset-4">
              qué esperar de tu primera reunión
            </Link>
            .
          </p>
        </Block>

        <Block icon={Sparkles} title="Principios básicos del programa">
          <ul className="list-disc space-y-2 pl-6">
            <li>Anonimato como base espiritual de nuestras tradiciones.</li>
            <li>El deseo de dejar de beber como único requisito para pertenecer.</li>
            <li>Compartir experiencia, fortaleza y esperanza entre iguales.</li>
            <li>Servicio voluntario y sostenimiento propio del grupo.</li>
            <li>No opinar sobre asuntos ajenos a nuestro propósito primordial.</li>
          </ul>
        </Block>

        <Block icon={HelpCircle} title="Preguntas frecuentes">
          <p>
            Si es tu primera vez acercándote a AA, es normal tener dudas. Hemos reunido las
            preguntas más comunes que hacen quienes llegan por primera vez.
          </p>
          <div className="pt-2">
            <Link
              to="/preguntas-frecuentes"
              className="btn-aa"
            >
              Ver preguntas frecuentes
            </Link>
          </div>
        </Block>

        <section className="rounded-3xl bg-soft/60 p-8 text-center sm:p-12">
          <h2 className="font-serif text-2xl italic text-brand sm:text-3xl">
            Si crees que tienes un problema con el alcohol, no estás solo
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ink/80">
            Siempre habrá un grupo de Alcohólicos Anónimos dispuesto a recibirte.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/grupos"
              className="btn-aa"
            >
              Encuentra un grupo
            </Link>
            <Link
              to="/necesito-ayuda"
              className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-paper px-5 py-2.5 text-sm font-medium text-brand transition-colors hover:bg-soft"
            >
              Busco ayuda
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

function Block({
  icon: Icon,
  title,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-full bg-brand/10 text-brand">
          <Icon className="size-5" />
        </span>
        <h2 className="font-serif text-2xl leading-tight text-brand sm:text-3xl">{title}</h2>
      </div>
      <div className="mt-5 space-y-4 text-pretty text-base leading-relaxed text-ink/85">
        {children}
      </div>
    </section>
  );
}
