import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-brand/5 bg-paper py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-[38ch]">
            <div className="mb-6 grid size-10 place-items-center rounded-full bg-brand/10">
              <div className="size-4 rotate-45 border border-brand" aria-hidden />
            </div>
            <p className="text-sm text-ink/60">
              Alcohólicos Anónimos es una comunidad de personas que comparten su mutua experiencia,
              fortaleza y esperanza para resolver su problema común y ayudar a otros a recuperarse
              del alcoholismo.
            </p>
          </div>

          <div className="flex flex-wrap gap-14">
            <div className="space-y-4">
              <h5 className="text-xs font-bold uppercase tracking-widest text-brand">Ayuda</h5>
              <ul className="space-y-2 text-sm text-ink/70">
                <li>
                  <Link to="/grupos" className="hover:text-brand">
                    Encuentra un grupo
                  </Link>
                </li>
                <li>
                  <Link to="/primera-reunion" className="hover:text-brand">
                    Tu primera reunión
                  </Link>
                </li>
                <li>
                  <Link to="/tengo-un-problema" className="hover:text-brand">
                    ¿Tienes un problema?
                  </Link>
                </li>
                <li>
                  <Link to="/necesito-ayuda" className="hover:text-brand">
                    Necesito ayuda ahora
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="text-xs font-bold uppercase tracking-widest text-brand">Comunidad</h5>
              <ul className="space-y-2 text-sm text-ink/70">
                <li>
                  <Link to="/que-es-aa" className="hover:text-brand">
                    ¿Qué es AA?
                  </Link>
                </li>
                <li>
                  <Link to="/testimonios" className="hover:text-brand">
                    Testimonios
                  </Link>
                </li>
                <li>
                  <Link to="/literatura" className="hover:text-brand">
                    Literatura
                  </Link>
                </li>
                <li>
                  <Link to="/eventos" className="hover:text-brand">
                    Eventos
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="text-xs font-bold uppercase tracking-widest text-brand">Contacto</h5>
              <ul className="space-y-2 text-sm text-ink/70">
                <li>
                  <a href="tel:+525555550000" className="hover:text-brand">
                    55 5555 0000
                  </a>
                </li>
                <li>
                  <a href="mailto:info@aa-area2.org.mx" className="hover:text-brand">
                    info@aa-area2.org.mx
                  </a>
                </li>
                <li>
                  <Link to="/auth" className="hover:text-brand">
                    Área de servicio
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-brand/5 pt-8 text-[10px] font-medium uppercase tracking-widest text-ink/40 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} AA Área 2 Metropolitana</span>
          <span>Ciudad de México</span>
          <span>El anonimato es la base espiritual de nuestras tradiciones</span>
        </div>
      </div>
    </footer>
  );
}
