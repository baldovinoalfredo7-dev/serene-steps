import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo-aa.png.asset.json";

export function Footer() {
  return (
    <footer className="border-t border-brand/10 bg-paper py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-[42ch]">
            <div className="mb-5 flex items-center gap-3">
              <img
                src={logoAsset.url}
                alt=""
                width={44}
                height={44}
                className="h-11 w-auto"
                aria-hidden
              />
              <div className="leading-tight">
                <span className="block text-sm font-bold uppercase tracking-[0.14em] text-brand">
                  Alcohólicos Anónimos
                </span>
                <span className="block text-xs font-medium text-ink/80">
                  Área 2 Metropolitana – Barranquilla
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-ink/80">
              Comunidad de hombres y mujeres que comparten su experiencia,
              fortaleza y esperanza para resolver su problema común y ayudar a
              otros a recuperarse del alcoholismo.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-4 sm:gap-14">
            <FooterColumn
              title="Ayuda"
              links={[
                { to: "/necesito-ayuda", label: "Busco ayuda" },
                { to: "/grupos", label: "Encuentra un grupo" },
                { to: "/primera-reunion", label: "Primera reunión" },
              ]}
            />
            <FooterColumn
              title="Comunidad"
              links={[
                { to: "/que-es-aa", label: "Bienvenido a tu casa en el Área 2" },
                { to: "/", label: "AA en el Caribe colombiano" },
                { to: "/literatura", label: "Nuestra literatura" },
              ]}
            />
            <FooterColumn
              title="Cooperación"
              links={[
                { to: "/contacto", label: "Trabajemos juntos" },
                { to: "/contacto", label: "Contacto" },
              ]}
            />
            <FooterColumn
              title="Miembros"
              links={[{ to: "/auth", label: "Acceso para miembros" }]}
            />
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-brand/10 pt-8 text-[11px] font-medium uppercase tracking-widest text-ink/60 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} AA Área 2 Metropolitana · Barranquilla, Colombia</span>
          <span className="italic normal-case tracking-normal text-ink/70">
            El anonimato es la base espiritual de nuestras tradiciones
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div className="space-y-4">
      <h5 className="text-xs font-bold uppercase tracking-widest text-brand">{title}</h5>
      <ul className="space-y-2.5 text-sm text-ink/80">
        {links.map((l) => (
          <li key={`${l.to}-${l.label}`}>
            <Link to={l.to} className="hover:text-brand">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
