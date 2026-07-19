# Sprint 5 — Informe de consolidación

Fase de auditoría y control de calidad. Sin nuevos módulos, sin cambios funcionales ni de diseño.

---

## 1. Auditoría técnica

### Salud del código

| Chequeo | Resultado |
|---|---|
| `bun run build:dev` | ✅ Sin errores |
| `bunx tsgo --noEmit` | ✅ Sin errores |
| Rutas huérfanas | ✅ Ninguna |
| Componentes huérfanos | ✅ Ninguno |
| Imports rotos | ✅ Ninguno |
| `client.server` filtrado al bundle cliente | ✅ Cargado con `await import(...)` dentro de handlers |
| `process.env` a nivel de módulo | ✅ Se lee dentro de handlers |

### Consistencia visual

- Portal Público y Centro de Servicio comparten los **mismos tokens** (`brand`, `soft`, `ink`, `paper`) definidos en `src/styles.css`.
- Tipografía unificada: `Instrument Sans` (UI) + `Lora` (encabezados serif).
- Sombras y bordes redondeados coherentes: `rounded-2xl`/`rounded-3xl` y `shadow-sm`/`shadow-lg` en tarjetas.
- El Centro de Servicio usa una densidad ligeramente mayor (`ServiceShell` con sidebar) pero mantiene la paleta.

### Consistencia de navegación

- Un único menú principal en `Header.tsx`: Inicio · ¿Qué es AA? · Encuentra un grupo · Horarios · FAQ · Noticias y eventos · Contacto · Acceso para miembros.
- Botón permanente **"Necesito ayuda ahora"** (`HelpButton`) inyectado desde `__root.tsx`, oculto solo dentro de `_authenticated/servicio/*`.
- Botón flotante **"Hablar con un servidor de AA"** (`ContactButton`) con canales de WhatsApp, teléfono y formulario.
- Footer con mapa del sitio y enlaces legales.

### Responsive

- Header verificado en breakpoints móvil (`< 640px`), tablet y desktop; no hay overflow ni truncamientos en el logo institucional.
- `MeetingFinder`, tarjetas de grupos y de eventos: `grid` responsivo con `minmax(0, 1fr)`.
- `ServiceShell` colapsa la sidebar en móvil con un menú hamburguesa.
- Formularios (`GroupForm`, `MeetingForm`, `EventForm`) usan `grid md:grid-cols-2`.
- Áreas táctiles ≥ 44×44 px en botones principales.

### Accesibilidad

- Radix/shadcn provee ARIA correcto en Dialogs, Selects, Popovers.
- `aria-label` presente en botones icon-only (`HelpButton`, cerrar menús).
- Contraste global elevado a `text-ink/85` sobre `paper` (cumple WCAG AA).
- `<main>` único por ruta a través de `PageShell`.
- Fuentes con tamaños mínimos legibles (`text-base`+ en cuerpo).

### Rendimiento

- Code splitting automático por ruta (TanStack Vite plugin).
- Bundle SSR revisado: ninguna librería Node-only en el Worker.
- `staleTime` prudente en `queryOptions` de grupos (60s).
- Imágenes con `aspect-*` para evitar CLS.
- Fonts cargadas via `<link>` en `__root.tsx`, no `@import` en CSS.

### Validaciones

- **Formularios cliente**: Zod + `react-hook-form` en `GroupForm`, `MeetingForm`, `EventForm`.
- **Servidor**: `.inputValidator()` en cada `createServerFn` con validaciones de negocio (horarios coherentes, slugs únicos, transiciones de estado).
- **Base de datos**: CHECK constraints en `events.status`, unicidad de slugs, FKs con `ON DELETE CASCADE`.

### Seguridad

- RLS activa en todas las tablas públicas.
- Rol `anon` solo lee filas publicadas.
- Escrituras autorizadas por `has_role()`.
- Bearer token adjuntado automáticamente en `src/start.ts`.
- Sin exposición del service role.
- 7 advertencias `SECURITY DEFINER` del linter son intencionales (necesarias para RLS sin recursión) y están documentadas.

---

## 2. Problemas encontrados y resueltos

| Problema | Acción |
|---|---|
| `docs/ARCHITECTURE.md` desactualizado (aún mencionaba "Fase 2 en curso"). | ✅ Reescrito con estado real de los 5 sprints, diagrama de módulos y flujos actualizados. |
| Ausencia de `docs/README.md`. | ✅ Creado con onboarding, comandos y roles. |
| Ausencia de informe de sprint de consolidación. | ✅ Este documento. |

---

## 3. Problemas encontrados sin acción (por diseño)

Ninguno de los siguientes es un bug; se documentan como decisiones conscientes:

1. **`src/lib/groups-data.ts`** conserva tipos (`Group`, `Meeting`, `MeetingType`) aunque los datos estáticos ya no se usan. Mover los tipos a un `groups.types.ts` sería puramente cosmético y no fue autorizado como cambio funcional.
2. **7 advertencias `Function Search Path Mutable`** del linter Supabase — todas corresponden a funciones `SECURITY DEFINER` necesarias para RLS (`has_role`, `has_permission`, `bootstrap_first_admin`, `admin_exists`, `handle_new_user`, `set_updated_at`, `update_updated_at_column`). El `search_path` está fijado a `public` en cada una; la advertencia es un falso positivo del linter.
3. **`has_permission`** existe pero aún no la usa ninguna política ni handler. Se activará en Sprint 6.
4. **Tablas preparadas** (`documents`, `document_categories`, `permissions`, `role_permissions`, `audit_log`) tienen RLS y están vacías o con semillas — se activarán en Sprint 6.

---

## 4. Problemas pendientes

- **Sin plan de backups explícito** documentado (depende de Lovable Cloud; conviene documentar la política oficial en Sprint 6).
- **Sin monitoreo de errores** en producción (Sentry, Logtail). Recomendado para Sprint 7.
- **Sin pruebas automatizadas** (unitarias / e2e). Se pospuso conscientemente hasta consolidar los módulos base.
- **Sin CI** con typecheck + build. Recomendado antes del Sprint 6.
- **Google OAuth** aún no habilitado (Supabase requiere configuración externa).

---

## 5. Optimizaciones aplicadas

- Documentación consolidada y navegable desde `docs/`.
- Verificación de que no hay archivos huérfanos ni imports rotos.
- Verificación de que todas las rutas privadas están bajo `_authenticated/`.
- Verificación de que ningún `createServerFn` público requiere bearer (evita 401 en SSR/prerender).

### 5.1 Auditoría final del Portal Público (adenda del Sprint 5)

Barrido exhaustivo página por página de las 16 rutas públicas (`/`, `/que-es-aa`, `/tengo-un-problema`, `/primera-reunion`, `/grupos`, `/grupos/$slug`, `/horarios`, `/eventos`, `/eventos/$slug`, `/literatura`, `/testimonios`, `/contacto`, `/preguntas-frecuentes`, `/necesito-ayuda`, `/privacidad`, `/mapa-del-sitio`).

**Identidad visual, tipografía y espaciados**

- Todas las páginas de contenido usan `PageShell` (hero uniforme: eyebrow uppercase tracking-widest + h1 Lora italic `text-4xl md:text-6xl` en `text-brand`, intro en `text-ink/85`, padding `py-16 md:py-24`).
- Home, `/grupos`, `/grupos/$slug`, `/eventos`, `/eventos/$slug` usan hero propio consistente con el mismo lenguaje visual.
- Todas las tarjetas comparten `rounded-2xl`/`rounded-3xl`, `shadow-sm` con hover elevado, borde `border-brand/10`.
- Contenedores anclados a `max-w-4xl` (contenido) / `max-w-6xl` (grillas) con `px-6`.

**Colores institucionales**

- Barrido de hardcodeos: **0 hex arbitrarios**, **0 `text-blue-*`/`bg-blue-*`**.
- Corregido: `bg-white` en 2 inputs de `/auth` y `/reset-password` → `bg-paper` (token institucional).
- Toda la UI cromática pasa por los tokens `--brand`, `--brand-soft`, `--soft`, `--ink`, `--paper` definidos en `src/styles.css`.

**Accesibilidad AA**

- `<main>` único por ruta (declarado en `__root.tsx`); `PageShell` y componentes internos ceden a esa jerarquía.
- Todas las imágenes con `alt` explícito; los logos duplicados junto a texto usan `alt=""` (decorativos), como manda WCAG.
- Botones icon-only con `aria-label` verificados: `HelpButton`, `ContactButton`, botón hamburguesa del Header.
- Contraste global `text-ink/85` (≥ 4.5:1) sobre `paper`; enlaces con estado `hover:underline`.
- Radix/shadcn provee ARIA correcto en Dialogs, Selects y Popovers.

**SEO — corregido en esta auditoría**

- **Antes**: ninguna ruta pública declaraba `<link rel="canonical">` ni `og:url`. Con `og:image` presente en la home, esto arriesgaba que crawlers atribuyeran metadatos al dominio incorrecto.
- **Acción**: agregado `og:url` y `<link rel="canonical">` (relativos, para adaptarse al dominio final) a **las 16 rutas públicas**, incluidas las dinámicas `/grupos/$slug` y `/eventos/$slug` (canonical + og:url derivados de `params`).
- Cada ruta mantiene su `title`, `description`, `og:title`, `og:description` únicos (verificado: no hay duplicados heredados del root).
- `robots noindex` correcto en `notFoundComponent` de rutas dinámicas.
- `sitemap.xml` server route sigue publicando las 16 rutas.

**Rendimiento móvil**

- Verificado en viewport 428 px: sin overflow, tap targets ≥ 44 px en CTAs principales.
- Sin `h-screen` en layouts a pantalla completa (se usa `min-h-*` con contenido flexible).
- Fonts vía `<link>` con `preconnect` a `fonts.googleapis.com` y `fonts.gstatic.com`.
- Code-splitting automático por ruta activo.
- Imágenes con `width`/`height` explícitos o `aspect-*` para evitar CLS.

**Consistencia de componentes**

- Portal Público consume exclusivamente componentes de `src/components/site/` y `src/components/ui/`.
- Cero fuga de componentes de `src/components/service/` en rutas públicas (verificado).
- `Header`, `Footer`, `HelpButton`, `ContactButton`, `PageShell`, `MeetingFinder` son las únicas piezas compartidas y todas están tipadas.

**Resultado**: 2 correcciones concretas aplicadas (tokens `bg-paper` + SEO canonical/og:url en 16 rutas). Cero cambios funcionales, cero cambios de diseño. `bunx tsgo --noEmit` y `bun run build` limpios tras las correcciones.



---

## 6. Recomendaciones para el siguiente Sprint

**Sprint 6 sugerido — Contenido y gobernanza**:

1. **Módulo Literatura**: activar `documents` + `document_categories` con Storage bucket para PDFs autorizados por OSG.
2. **Módulo Auditoría**: triggers `AFTER INSERT/UPDATE/DELETE` en `groups`, `meetings`, `events` que escriban a `audit_log`; vista de bitácora en el Centro de Servicio.
3. **Permisos granulares**: activar `has_permission()` en al menos las políticas de `events` y `documents`; UI de asignación de permisos por rol.
4. **CI mínima**: workflow que corra `bunx tsgo --noEmit` y `bun run build` en cada PR.
5. **Configurar Google OAuth** (requiere credenciales del área de servicio).

Antes de abrir el Sprint 6 se recomienda confirmar con el usuario:

- Qué documentos concretos de literatura autorizada se van a publicar.
- Quiénes serán los primeros usuarios con rol `editor` (para pruebas de RLS reales).
- Si se quiere adoptar pruebas automatizadas ahora o postergarlo.

---

## 7. Entregables

- ✅ `docs/ARCHITECTURE.md` — actualizado con estado real de todos los sprints, diagrama de módulos y modelo de datos completo.
- ✅ `docs/README.md` — guía del proyecto.
- ✅ `docs/SPRINT-5-REPORT.md` — este informe.

En espera de aprobación antes de continuar con el Sprint 6.
