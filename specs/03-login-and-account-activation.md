# Spec 03 — Login y activación de cuenta (`/login`, `/activate`)

**Estado:** Implemented
**Depende de:** SPEC 01, SPEC 02
**Fecha:** 2026-09-29
**Objetivo:** Implementar `login.dc.html` y `activar-cuenta.dc.html` como `/login` y `/activate` (solo UI estática, sin selector de rol, sin autenticación), y apuntar «Cerrar sesión» del sidebar a `/login`.

## Alcance

### Dentro

- `/login`: grid 2 columnas (1.05fr/1fr). Hero izquierda: gradiente `#F6A98E→#EC7E62`, círculos decorativos translúcidos, logo OpenDayCare + sol, título «El día de cada niño, compartido con su familia.», texto, footer «🌿 Guardería Sala Soles». Columna derecha (max 392px): título «Iniciar sesión», subtítulo «Ingresá para ver el día de hoy.», labels EMAIL/CONTRASEÑA con inputs (email default `caro@opendaycare.com`), link «¿Olvidaste tu contraseña?» (`href="#"`), botón «Iniciar sesión» (`href="#"`), link «Activá tu cuenta» → `/activate`. **Sin bloque «INGRESO COMO» (Personal/Familia)** — decisión del usuario.
- `/activate`: columna única centrada (max 440px): logo 58px con gradiente, título «Bienvenida a OpenDayCare», intro, panel invitación (avatar «M» sky, «Te invitaron a seguir a» / «Mateo · Sala Soles»), input CÓDIGO DE INVITACIÓN (default `7K4P9`, Fredoka, letter-spacing 3px), input EMAIL (default `lucia.fernandez@gmail.com`), input CREAR CONTRASEÑA, checkbox autorización fotos (checked estático), botón «Activar mi cuenta» (`href="#"`), link «¿Ya tenés cuenta? Iniciar sesión» → `/login`.
- `app/components/sidebar.tsx`: botón «Cerrar sesión» pasa de `href="#"` a `<Link href="/login">`.
- Tokens nuevos en `app/globals.css`: auth bg `#FBF4EC`, borde input `#EADFD0`, placeholder `#B6A99B`, gradiente hero `#F6A98E→#EC7E62`, checkbox (fondo `#FBF1D6`, check `#5FB97E`, texto `#8A7234`); borde acento `#F2A78E` reutiliza `card-hover`.
- Móvil <768px: hero de `/login` oculto, columna única centrada; `/activate` ya es columna única.

### Fuera (para specs futuros)

- Autenticación, validación, submit real, API, persistencia.
- Pantalla «¿Olvidaste tu contraseña?» — queda `href="#"`.
- Familia-feed (destino del mockup de activar) — botón queda `href="#"`.
- Selector de rol Personal/Familia y rutas por rol.
- Sesión real tras «Cerrar sesión».

## Modelo de datos

Sin datos nuevos. Markup estático sin `useState`; valores default de los mockups hardcodeados.

## Plan de implementación

1. `app/globals.css`: agregar tokens auth.
2. `app/login/page.tsx`: hero (`hidden md:flex`) + formulario, sin selector de rol.
3. `app/activate/page.tsx`: flujo de activación estático.
4. `app/components/sidebar.tsx`: «Cerrar sesión» → `<Link>` a `/login`.
5. Verificación: `npm run lint`, `npx tsc --noEmit`, `npm run dev` + screenshots en `.playwright-mcp/` contra los dos mockups.

## Criterios de aceptación

- [x] `/login` visualmente idéntico a `login.dc.html` excepto el bloque «INGRESO COMO» que no existe.
- [x] `/activate` visualmente idéntico a `activar-cuenta.dc.html`.
- [x] Cero botones/traza del selector Personal/Familia en `/login`.
- [x] «Iniciar sesión» y «Activar mi cuenta» son `href="#"` inertes.
- [x] «¿Olvidaste tu contraseña?» `href="#"`.
- [x] Cross-links reales: `/login` → «Activá tu cuenta» → `/activate`; `/activate` → «Iniciar sesión» → `/login`.
- [x] «Cerrar sesión» del sidebar navega a `/login` (desktop y drawer móvil).
- [x] Inputs con defaults de mockup (`caro@opendaycare.com`, `7K4P9`, `lucia.fernandez@gmail.com`); checkbox autorización marcado.
- [x] Móvil <768px: hero de `/login` oculto, form centrado; `/activate` una columna.
- [x] `/login` y `/activate` sin sidebar (pantallas full-screen independientes).
- [x] `npm run lint` y `npx tsc --noEmit` sin errores.
- [x] Identificadores en inglés; texto UI en español.

## Decisiones tomadas

- **Sí: rutas `/login` y `/activate`** — usuario pidió `/activate` explícito; resto en inglés como `/kids`.
- **Sí: sin selector de rol Personal/Familia** — pedido explícito del usuario.
- **Sí: botones submit inertes `href="#"`** — decisión del usuario; sin auth no hay adónde navegar.
- **Sí: estático puro, sin `useState`** — convención specs 01/02.
- **Sí: «Cerrar sesión» → `/login`** — decisión del usuario; única integración con pantallas existentes.
- **Sí: hero oculto <768px** — decisión del usuario; sin mockup móvil.
- **Sí: tokens nuevos para paleta auth** — convención `@theme` del repo; fidelidad verificada por screenshot.
- **No: forgot-password, familia-feed, auth real** — pantallas/lógica futuras, cada una con spec propio.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| Deriva visual inline styles → Tailwind (gradientes, círculos absolutos, checkbox custom) | Screenshots lado a lado contra mockups |

## Qué **no** está en este spec

- Autenticación, validación, submit, sesión.
- ¿Olvidaste tu contraseña?, familia-feed.
- Selector de rol.
