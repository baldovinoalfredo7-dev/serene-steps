import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "../components/site/Header";
import { Footer } from "../components/site/Footer";
import { HelpButton } from "../components/site/HelpButton";
import { ContactButton } from "../components/site/ContactButton";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl italic text-brand">404</h1>
        <h2 className="mt-4 font-serif text-2xl text-brand">Página no encontrada</h2>
        <p className="mt-2 text-sm text-ink/60">
          La página que buscas no existe o fue movida. La ayuda sigue estando cerca.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-sm bg-brand px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-brand/90"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-2xl italic text-brand">Esta página no cargó</h1>
        <p className="mt-2 text-sm text-ink/60">
          Ocurrió un problema. Puedes intentar de nuevo o volver al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-sm bg-brand px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-brand/90"
          >
            Intentar de nuevo
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-sm border border-brand/20 bg-paper px-5 py-3 text-sm font-medium text-brand transition-colors hover:bg-soft"
          >
            Ir al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

const SITE_TITLE = "Alcohólicos Anónimos · Área 2 Metropolitana Barranquilla";
const SITE_DESCRIPTION =
  "La ayuda está más cerca de lo que imaginas. Encuentra una reunión de Alcohólicos Anónimos en Barranquilla, Soledad, Malambo, Galapa y Puerto Colombia. Sin inscripción, sin cuotas, anonimato garantizado.";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "author", content: "AA Área 2 Metropolitana" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Lovable App" },
      { property: "og:title", content: "Lovable App" },
      { name: "twitter:title", content: "Lovable App" },
      { name: "description", content: "Serene Steps is a web portal for Alcoholics Anonymous, offering meeting information and resources for those seeking help." },
      { property: "og:description", content: "Serene Steps is a web portal for Alcoholics Anonymous, offering meeting information and resources for those seeking help." },
      { name: "twitter:description", content: "Serene Steps is a web portal for Alcoholics Anonymous, offering meeting information and resources for those seeking help." },
      { property: "og:image", content: "https://project--b2ac4377-59f2-46ea-a581-d53e687bd969.lovable.app/og.jpg" },
      { name: "twitter:image", content: "https://project--b2ac4377-59f2-46ea-a581-d53e687bd969.lovable.app/og.jpg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..600;1,400..600&family=Lora:ital,wght@0,400..600;1,400..600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const pathname = router.state.location.pathname;
  const isServiceCenter =
    pathname === "/servicio" ||
    pathname.startsWith("/servicio/") ||
    pathname === "/miembros" ||
    pathname.startsWith("/miembros/");

  useEffect(() => {
    let mounted = true;
    // Session sync: react to identity changes only.
    import("@/integrations/supabase/client").then(({ supabase }) => {
      if (!mounted) return;
      const { data } = supabase.auth.onAuthStateChange((event) => {
        if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
        router.invalidate();
        if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
      });
      // store unsubscribe for cleanup
      (mounted as unknown) && ((window as unknown as { __aaAuthSub?: unknown }).__aaAuthSub = data.subscription);
    });
    return () => {
      mounted = false;
      const sub = (window as unknown as { __aaAuthSub?: { unsubscribe: () => void } }).__aaAuthSub;
      sub?.unsubscribe();
    };
  }, [queryClient, router]);

  if (isServiceCenter) {
    return (
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <Toaster richColors position="top-center" />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-dvh flex-col bg-paper">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <HelpButton />
        <ContactButton />
        <Toaster richColors position="top-center" />
      </div>
    </QueryClientProvider>
  );
}

