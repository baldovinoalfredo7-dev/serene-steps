# Arquitectura — Portal AA Área 2 Metropolitana (Barranquilla)

Documento vivo de arquitectura técnica. Se actualiza al cierre de cada Sprint.

Última actualización: Sprint 5 — Consolidación.

---

## Estado de los Sprints

| Sprint | Alcance | Estado |
|---|---|---|
| **1 — Portal Público (v1)** | Rutas públicas, diseño editorial sereno, datos estáticos. | ✅ Cerrado |
| **2 — Backend base** | Lovable Cloud, esquema, RLS, migración de datos, Portal Público leyendo desde DB. | ✅ Cerrado |
| **3 — Autenticación** | Supabase Auth, gate `_authenticated/`, `/perfil`, bootstrap del primer admin. | ✅ Cerrado |
| **4a — Centro de Servicio (Grupos y Reuniones)** | CRUD RLS-aware, `ServiceShell`, dashboard. | ✅ Cerrado |
| **4b — Módulo de Eventos** | CRUD completo, publicación/archivado, portal público de eventos, compartir. | ✅ Cerrado |
| **5 — Consolidación** | Auditoría, documentación, limpieza, sin nuevos módulos. | 🔧 En curso |
| **6 — Contenido y gobernanza** (planeado) | Literatura + Storage, `audit_log`, permisos granulares con `has_permission()`. | ⏳ Pendiente |

---

## Stack técnico

- **Frontend / SSR**: TanStack Start v1, React 19, Vite 7, Tailwind v4 (tokens semánticos en `src/styles.css`).
- **Router**: TanStack Router con archivos en `src/routes/` (routeTree autogenerado).
- **Datos**: PostgreSQL gestionado (Lovable Cloud / Supabase).
- **Acceso a datos servidor**: `createServerFn` desde `@tanstack/react-start`.
- **Caché cliente**: TanStack Query (`ensureQueryData` + `useSuspenseQuery`).
- **Auth**: Supabase Auth (email + contraseña), middleware `requireSupabaseAuth` + bearer attacher en `src/start.ts`.
- **Runtime servidor**: Cloudflare Workers (nodejs_compat).
- **UI**: shadcn/ui sobre Radix; iconos de `lucide-react`; toasts con `sonner`.

---

## Estructura del repositorio

```
src/
├── routes/                       # Rutas TanStack Router (file-based)
│   ├── __root.tsx                # Shell HTML, providers, HelpButton, sesión global
│   ├── index.tsx                 # Home (Hero + secciones)
│   ├── que-es-aa.tsx | tengo-un-problema.tsx | primera-reunion.tsx
│   ├── grupos.tsx | grupos.$slug.tsx
│   ├── horarios.tsx | eventos.tsx | eventos.$slug.tsx
│   ├── literatura.tsx | testimonios.tsx | contacto.tsx | preguntas-frecuentes.tsx
│   ├── necesito-ayuda.tsx | privacidad.tsx | mapa-del-sitio.tsx
│   ├── auth.tsx | reset-password.tsx
│   ├── sitemap[.]xml.ts          # Ruta HTTP (server route)
│   └── _authenticated/           # Subárbol gated (ssr:false)
│       ├── route.tsx             # Gate integrado (no editar manualmente)
│       ├── perfil.tsx
│       ├── servicio.tsx          # Layout del Centro de Servicio
│       ├── servicio.index.tsx    # Dashboard
│       ├── servicio.grupos.*     # CRUD grupos
│       ├── servicio.reuniones.index.tsx
│       ├── servicio.eventos.*    # CRUD eventos
│       └── servicio.perfil.tsx
├── components/
│   ├── site/                     # Portal público: Header, Footer, HelpButton, PageShell, MeetingFinder, ContactButton
│   ├── service/                  # Centro de Servicio: ServiceShell, GroupForm, MeetingForm, EventForm
│   └── ui/                       # shadcn/ui
├── lib/
│   ├── groups-data.ts            # Solo tipos compartidos (Group, Meeting, MeetingType)
│   ├── groups.functions.ts       # Lectura pública de grupos (anon)
│   ├── groups-queries.ts         # queryOptions reutilizables
│   ├── service.functions.ts      # CRUD RLS-aware: grupos, reuniones, municipios
│   ├── events.functions.ts       # CRUD RLS-aware + lectura pública de eventos
│   ├── auth.functions.ts         # Perfil, roles, bootstrap admin
│   ├── contact-config.ts         # Config de canales de contacto
│   ├── slug.ts                   # Slugify determinista
│   └── utils.ts                  # cn(), helpers
├── hooks/
│   ├── use-auth.ts               # Sesión global (client)
│   └── use-mobile.tsx
├── integrations/supabase/        # Auto-generado (no editar)
└── styles.css                    # Tokens de diseño (paleta AA institucional)
docs/
├── ARCHITECTURE.md               # Este documento
├── README.md                     # Guía del proyecto
└── SPRINT-5-REPORT.md            # Informe de consolidación
```

---

## Modelo de datos

### Tablas activas

| Tabla | Responsabilidad | Consumida por |
|---|---|---|
| `municipalities` | 5 municipios del Área 2 (Barranquilla, Soledad, Malambo, Galapa, Puerto Colombia). | `/grupos`, `/horarios`, `MeetingFinder`, Centro de Servicio. |
| `groups` | 9 grupos del Área 2 (slug, dirección, historia, contacto IP, coords, `municipality_id`, `is_published`). | Portal público y Centro de Servicio. |
| `meetings` | Horarios semanales por grupo (día, hora inicio/fin, tipo). | `/grupos/$slug`, `/horarios`, `MeetingFinder`. |
| `events` | Eventos del área (`status`: draft/published/archived, `is_featured`, `slug`, contacto, imagen). | `/eventos`, `/eventos/$slug`, Centro de Servicio. |
| `profiles` | Perfil mínimo del usuario autenticado (nombre). | `/perfil`, `/servicio/perfil`. |
| `user_roles` | Asignación `user_id → app_role` (`admin`, `editor`, `member`). Base de `has_role()`. | Políticas RLS de escritura. |

### Tablas preparadas (inactivas)

Existen con RLS activo pero no son leídas por ningún código. Se activarán en Sprint 6.

| Tabla | Se activa en | Uso futuro |
|---|---|---|
| `document_categories` | Sprint 6 | Categorizar literatura autorizada. |
| `documents` | Sprint 6 | Biblioteca de folletos (con Storage). |
| `permissions` | Sprint 6 | 10 permisos granulares ya sembrados. |
| `role_permissions` | Sprint 6 | Mapeo rol → permiso. |
| `audit_log` | Sprint 6 | Bitácora de cambios administrativos. |

### Funciones SQL

- **Activas**: `has_role(uuid, app_role)`, `bootstrap_first_admin()`, `admin_exists()`, `set_updated_at()`, `handle_new_user()`.
- **Preparadas**: `has_permission(uuid, text)` — se activará en Sprint 6.

Todas usan `SECURITY DEFINER` y `search_path = public` (advertencias del linter son intencionales por RLS).

---

## Flujos de datos

### Lectura pública (Portal Público)

```
Visitante → Ruta SSR pública
         → loader: queryClient.ensureQueryData(queryOptions)
         → createServerFn (sin middleware)
         → Supabase publishable client (rol anon)
         → PostgreSQL con RLS pública (is_published/status='published')
         → DTO serializable
         → useSuspenseQuery
```

### Escritura autenticada (Centro de Servicio)

```
Servidor autenticado → Ruta bajo _authenticated/
                    → useServerFn(fn) + useMutation
                    → createServerFn.middleware([requireSupabaseAuth])
                    → context.supabase (RLS como el usuario)
                    → PostgreSQL: políticas has_role('admin'|'editor')
                    → queryClient.invalidateQueries(...)
```

---

## Diagrama de módulos

```
                    ┌───────────────────────────┐
                    │      __root.tsx           │
                    │  (Providers, sesión,      │
                    │   HelpButton, ContactBtn) │
                    └────────────┬──────────────┘
                                 │
                ┌────────────────┴────────────────┐
                │                                 │
        ┌───────▼────────┐              ┌─────────▼──────────┐
        │ Portal Público │              │  _authenticated/    │
        │ (SSR)          │              │  (ssr:false, gate)  │
        └───────┬────────┘              └─────────┬──────────┘
                │                                 │
   ┌────────────┼────────────┐          ┌─────────┼──────────┐
   │            │            │          │         │          │
┌──▼──┐  ┌──────▼─────┐ ┌────▼───┐  ┌───▼──┐ ┌────▼──────┐ ┌─▼──────┐
│Home │  │  Grupos    │ │Eventos │  │Perfil│ │ Servicio  │ │Auth/   │
│     │  │  /Horarios │ │        │  │      │ │ (Grupos,  │ │Reset   │
└──┬──┘  └──────┬─────┘ └────┬───┘  └──────┘ │ Reuniones,│ └────────┘
   │            │            │               │ Eventos)  │
   └────────────┴────────────┘               └─────┬─────┘
                │                                  │
                ▼                                  ▼
       groups.functions.ts                service.functions.ts
       events.functions.ts (public)       events.functions.ts (admin)
                │                                  │
                └──────────────┬───────────────────┘
                               ▼
                    PostgreSQL + RLS (Lovable Cloud)
```

---

## Convenciones

- **Rutas**: file-based, un archivo = una ruta; `_authenticated/` para privado; sin `Route.useRouter()`.
- **Head metadata**: cada ruta pública define su propio `head()` con `title`, `description`, `og:*`. Nunca `og:image` en `__root`.
- **Datos**: leer siempre vía loader + `useSuspenseQuery`. Prohibido `useEffect + fetch` para render inicial.
- **Server functions**: `.functions.ts` (client-safe) o `.server.ts` (bloqueado del bundle cliente).
- **Tokens de diseño**: colores/tipografía en `styles.css` (`--brand`, `--ink`, `--paper`, `--soft`). Prohibido `bg-blue-500` o hex arbitrarios en componentes.
- **Validación**: doble capa — Zod en formularios cliente + validación en el handler del server function.
- **Accesibilidad**: componentes shadcn/Radix; `aria-label` en botones icon-only; `<main>` único por ruta (vía `PageShell`).

---

## Seguridad

- **RLS activa en 100% de las tablas públicas**.
- **Rol `anon`**: solo SELECT sobre `groups`/`meetings`/`municipalities`/`events` con filtros de publicación.
- **Rol `authenticated`**: escrituras validadas por `has_role()` en cada política.
- **Rol `service_role`**: no usado desde el frontend; reservado para migraciones y jobs futuros.
- **Sin exposición del service role key** en el cliente ni en `.functions.ts` a nivel de módulo.
- **Bootstrap del primer admin**: función `bootstrap_first_admin()` que solo actúa una vez.

---

## Rendimiento

- Code splitting automático por ruta (TanStack Vite plugin).
- `useSuspenseQuery` con `staleTime` prudente por dominio.
- Imágenes servidas con `aspect-*` y `object-cover`.
- Fonts vía `<link>` en `__root.tsx` (Lora + Instrument Sans).
- Sin dependencias Node-only en el bundle Worker.

---

## Roadmap futuro

- **Sprint 6 — Contenido y gobernanza**: activar `documents` + Storage para literatura, `audit_log` con triggers, `has_permission()` en políticas.
- **Sprint 7 — Notificaciones y comunicaciones**: correos transaccionales (recordatorios de eventos, invitaciones).
- **Sprint 8 — Reportes y analítica interna** para el Centro de Servicio.
