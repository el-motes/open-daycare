# Spec 02 — Niños: lista y perfil (`/kids`)

**Estado:** Implemented
**Depende de:** SPEC 01
**Fecha:** 2026-09-15
**Objetivo:** Implementar las pantallas `ninos.dc.html` y `perfil-nino.dc.html` como `/kids` y `/kids/[id]` (solo interfaces y componentes, sin lógica de negocio), extrayendo el sidebar a componente compartido.

## Alcance

### Dentro

- Sidebar compartido `app/components/sidebar.tsx`: extraído de `app/page.tsx` (desktop + drawer móvil + hamburguesa), item activo según ruta (`usePathname`): Feed → `/`, Niños → `/kids`, Avisos/Mi cuenta → `href="#"`.
- `/kids` (lista): kicker «GESTIÓN», título «Niños», botón «Agregar niño» (`href="#"`), buscador con filtro client-side por nombre, separador «SALA SOLES · 8 niños», grid 2 columnas con 8 cards (avatar, nombre, meta «3 años · 2 padres vinculados», badge MANÍ/LACTOSA/VINCULAR o chevron, hover borde `#F2A78E` + `translateY(-2px)`).
- `/kids/[id]` (perfil): link «Volver a Niños», header con avatar 84px + botón «Editar» (`href="#"`), panel alergias/notas (solo si el niño tiene), ficha (Fecha de nacimiento / Sala / Ingreso), columna derecha con botón «Resumen del día» (`href="#"`) y panel «PADRES VINCULADOS» (badges ACTIVA/PENDIENTE, link «Vincular otro padre» `href="#"`).
- Datos mock de los 8 niños (modelo completo para todos, no solo Mateo) en `app/lib/mock-data.ts`.
- Tokens nuevos en `app/globals.css`: pares de avatar por niño (sky/pink/green/yellow/violet), badges (alergia `#FBD8CC/#D9684A`, vincular `#F9D2DE/#C56486`, pendiente `#F7E7A6/#9A7B1E`, activa reutiliza `logro-*`), panel alergias (`#FBDAD6`, icono `#F4A8A0`, títulos `#C5413A`/`#B25249`), hover card `#F2A78E`, chevron `#CBB89F`.

### Fuera (para specs futuros)

- Autenticación, base de datos, API, persistencia.
- Pantallas Agregar niño, Editar, Resumen del día, Vincular padre — sus links quedan `href="#"` (convención spec 01).
- Cálculo de edad desde fecha de nacimiento (edad = string mock).
- Contador «8 niños» dinámico respecto al filtro (queda estático).
- Avisos, Mi cuenta, Nueva publicación.

## Modelo de datos

Sin persistencia. `app/lib/mock-data.ts`:

```ts
type ParentStatus = "active" | "pending";

type Parent = {
  name: string;
  initials: string;
  relation: string; // "Mamá" | "Papá"
  status: ParentStatus;
};

type AvatarColor = "sky" | "pink" | "green" | "yellow" | "violet";

type Child = {
  id: string;          // slug URL: "mateo-fernandez"
  name: string;
  initials: string;
  ageLabel: string;    // "3 años"
  allergyTag?: string;    // "MANÍ" | "LACTOSA"
  allergyNotes?: string;  // texto del panel
  birthDate: string;   // "12 mar 2022"
  room: string;        // "Soles"
  enrolledAt: string;  // "feb 2025"
  avatar: AvatarColor;
  parents: Parent[];
};

export const children: Child[] = [ /* 8 niños tal mockup + inventados coherentes */ ];
```

Texto «N padres vinculados» / «sin padres vinculados» se deriva de `parents.length` en la página.

## Plan de implementación

1. `app/globals.css`: agregar tokens nuevos (avatares, badges, alergias, hover, chevron).
2. `app/lib/mock-data.ts`: crear tipos + `children` (los 8, Mateo tal cual mockup).
3. `app/components/sidebar.tsx`: extraer sidebar completo de `page.tsx` con `usePathname` para item activo; links reales Feed `/` y Niños `/kids`.
4. `app/page.tsx`: reemplazar markup inline por `<Sidebar />` (sin cambios visuales en `/`).
5. `app/kids/page.tsx`: lista completa — header, buscador con filtro (`useState`), separador, grid de cards.
6. `app/kids/[id]/page.tsx`: perfil — busca child por `id`, `notFound()` si no existe. Antes de codificar: leer `node_modules/next/dist/docs/` sobre dynamic routes (params puede ser async en Next 16).
7. Verificación: `npm run lint`, `npx tsc --noEmit`, `npm run dev` + screenshots en `.playwright-mcp/` comparados contra los mockups.

## Criterios de aceptación

- [x] `/kids` visualmente idéntico a `ninos.dc.html` (screenshot lado a lado).
- [x] `/kids/mateo-fernandez` visualmente idéntico a `perfil-nino.dc.html`.
- [x] Grid 2 columnas, 8 cards, hover borde `#F2A78E` + `translateY(-2px)`.
- [x] Badges MANÍ, LACTOSA, VINCULAR según niño; chevron en cards sin badge.
- [x] Buscador filtra cards por nombre en vivo; borrar texto restaura las 8.
- [x] Card entera navega a `/kids/[id]`.
- [x] Panel alergias solo en niños con `allergyNotes`; sin él, no se renderiza.
- [x] Perfil: badges ACTIVA/PENDIENTE por estado de padre + «Vincular otro padre» `href="#"`.
- [x] `/` sin cambios visuales respecto a spec 01; Feed activo en `/`, Niños activo en `/kids` y `/kids/[id]`.
- [x] `/kids/id-inexistente` → 404 (`notFound()`).
- [x] Móvil <768px: drawer hamburguesa funciona en las tres páginas.
- [x] Links a pantallas futuras son `href="#"`.
- [x] `npm run lint` y `npx tsc --noEmit` pasan sin errores.
- [x] Identificadores en inglés; texto UI en español.

## Decisiones tomadas

- **Sí: extraer `<Sidebar />`** a `app/components/sidebar.tsx` — previsto en spec 01 («extraer cuando exista segunda pantalla»).
- **Sí: rutas en inglés `/kids`, `/kids/[id]`** — decisión del usuario; UI sigue en español.
- **Sí: datos mock para los 8 niños** en archivo compartido — ambas páginas consumen el mismo array; Mateo tal cual mockup, resto inventado coherente.
- **Sí: buscador filtra client-side** — única interactividad permitida, decisión explícita del usuario.
- **Sí: `href="#"` para links muertos** — convención spec 01.
- **Sí: panel alergias condicional** — mockup solo lo define con contenido; oculto cuando no hay.
- **No: contador dinámico** — «8 niños» queda estático, no sigue el filtro.
- **No: cálculo de edad** — `ageLabel` string; cálculo real con otra spec si llega persistencia.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| Next 16 breaking changes (params de dynamic route posiblemente async) | Leer `node_modules/next/dist/docs/` antes del paso 6 |
| Deriva visual inline styles → Tailwind | Screenshot comparación contra mockups |

## Qué **no** está en este spec

- Agregar/editar niño, Resumen del día, Vincular padre — cada uno con spec propio si llega.
- Autenticación, DB, API.
- Edad calculada, contador dinámico.
