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

          <div className="grid gap-10 sm:grid-cols-3 sm:gap-14">
            <div className="space-y-4">
              <h5 className="text-xs font-bold uppercase tracking-widest text-brand">
                Contacto
              </h5>
              <ul className="space-y-2.5 text-sm text-ink/80">
                <li>
                  <a href="tel:+573000000000" className="hover:text-brand">
                    Línea de ayuda: +57 300 000 0000
                  </a>
                </li>
                <li>
                  <a href="mailto:contacto@aa-area2.org" className="hover:text-brand">
                    contacto@aa-area2.org
                  </a>
                </li>
                <li>
                  <Link to="/contacto" className="hover:text-brand">
                    Formulario de contacto
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="text-xs font-bold uppercase tracking-widest text-brand">
                Comunidad
              </h5>
              <ul className="space-y-2.5 text-sm text-ink/80">
                <li>
                  <Link to="/grupos" className="hover:text-brand">
                    Encuentra un grupo
                  </Link>
                </li>
                <li>
                  <Link to="/que-es-aa" className="hover:text-brand">
                    ¿Qué es AA?
                  </Link>
                </li>
                <li>
                  <Link to="/testimonios" className="hover:text-brand">
                    Historias de esperanza
                  </Link>
                </li>
                <li>
                  <Link to="/eventos" className="hover:text-brand">
                    Noticias y eventos
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="text-xs font-bold uppercase tracking-widest text-brand">
                Área 2
              </h5>
              <ul className="space-y-2.5 text-sm text-ink/80">
                <li>
                  <Link to="/auth" className="hover:text-brand">
                    Acceso para miembros
                  </Link>
                </li>
                <li>
                  <Link to="/necesito-ayuda" className="hover:text-brand">
                    Necesito ayuda ahora
                  </Link>
                </li>
                <li>
                  <Link to="/mapa-del-sitio" className="hover:text-brand">
                    Mapa del sitio
                  </Link>
                </li>
                <li>
                  <Link to="/privacidad" className="hover:text-brand">
                    Política de privacidad
                  </Link>
                </li>
              </ul>
            </div>
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
