# Portal AA — Área 2 Metropolitana (Barranquilla)

Plataforma web institucional de Alcohólicos Anónimos para el Área 2 Metropolitana de Barranquilla. Compuesta por dos superficies:

- **Portal Público** — para personas que buscan ayuda por primera vez, familiares y visitantes. Directorio de grupos, horarios, eventos y literatura.
- **Centro de Servicio** — espacio de trabajo interno para servidores autorizados. Gestión de grupos, reuniones, eventos y perfiles.

Lema: *"La ayuda está más cerca de lo que imaginas."*

---

## Stack

TanStack Start v1 · React 19 · TypeScript · Tailwind v4 · shadcn/ui · TanStack Query · Supabase (Lovable Cloud) · Cloudflare Workers.

---

## Estructura mínima

```
src/routes/                  # Rutas file-based (públicas + _authenticated/)
src/components/site/         # UI del Portal Público
src/components/service/      # UI del Centro de Servicio
src/components/ui/           # shadcn/ui
src/lib/*.functions.ts       # createServerFn (client-safe)
src/lib/*.server.ts          # solo servidor
docs/ARCHITECTURE.md         # arquitectura técnica y modelo de datos
docs/SPRINT-5-REPORT.md      # informe de consolidación
```

Ver [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) para el detalle completo.

---

## Comandos

| Acción | Comando |
|---|---|
| Desarrollo | `bun dev` |
| Build de producción | `bun run build` |
| Typecheck | `bunx tsgo --noEmit` |

Todas las variables de entorno (`SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, etc.) son gestionadas por Lovable Cloud. No requiere configuración manual.

---

## Roles

| Rol | Alcance |
|---|---|
| `admin` | Acceso completo al Centro de Servicio, gestión de usuarios y roles. |
| `editor` | Gestión de grupos, reuniones y eventos. |
| `member` | Acceso al perfil personal. |

El primer usuario que se registra puede reclamar el rol `admin` mediante el botón "Convertirme en el primer administrador" en `/perfil` (función `bootstrap_first_admin()`).

---

## Sprints entregados

- **1–2** — Portal Público + backend base.
- **3** — Autenticación y bootstrap admin.
- **4a** — Centro de Servicio (grupos y reuniones).
- **4b** — Módulo de Eventos.
- **5** — Consolidación y control de calidad (documentación).

---

## Diseño

Paleta institucional AA Colombia (azul `#2F6FB6`), tipografía Lora + Instrument Sans, esquinas suaves y sombras discretas. Todos los colores están tokenizados en `src/styles.css`; los componentes no deben usar hex ni utilidades cromáticas arbitrarias.
