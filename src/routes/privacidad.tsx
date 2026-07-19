import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Política de privacidad — AA Área 2 Metropolitana" },
      {
        name: "description",
        content:
          "Cómo tratamos los datos personales y protegemos el anonimato de quienes visitan y participan en AA Área 2 Metropolitana.",
      },
      { property: "og:title", content: "Política de privacidad — AA Área 2" },
      {
        property: "og:description",
        content: "Compromiso con el anonimato y el manejo responsable de datos personales.",
      },
      { property: "og:url", content: "/privacidad" },
    ],
    links: [{ rel: "canonical", href: "/privacidad" }],
  }),
  component: Privacidad,
});

function Privacidad() {
  return (
    <PageShell
      eyebrow="Aviso legal"
      title="Política de privacidad"
      intro="El anonimato es la base espiritual de nuestras tradiciones. Este sitio se diseñó para proteger tu identidad."
    >
      <div className="space-y-8 text-ink/75">
        <section>
          <h2 className="mb-3 font-serif text-2xl text-brand">Anonimato</h2>
          <p>
            No solicitamos ni almacenamos nombres, apellidos ni fotografías de miembros. Los
            testimonios publicados en este sitio se comparten de forma anónima, con el
            consentimiento previo de sus autores.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-serif text-2xl text-brand">Datos que recopilamos</h2>
          <p>
            Únicamente recopilamos la información que decides enviarnos a través del formulario de
            contacto (nombre opcional, correo electrónico y mensaje) con el único propósito de
            responderte. Nunca compartimos tus datos con terceros.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-serif text-2xl text-brand">Cookies</h2>
          <p>
            Este sitio utiliza únicamente cookies técnicas necesarias para su funcionamiento.
            No utilizamos cookies publicitarias ni herramientas de rastreo de terceros.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-serif text-2xl text-brand">Contacto</h2>
          <p>
            Si tienes preguntas sobre esta política, escríbenos a{" "}
            <a href="mailto:contacto@aa-area2.org" className="text-brand underline">
              contacto@aa-area2.org
            </a>
            .
          </p>
        </section>
      </div>
    </PageShell>
  );
}
