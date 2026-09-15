# Spec 01 — Feed como Home

**Estado:** Implemented
**Depende de:** ninguno
**Fecha:** 2026-09-15
**Objetivo:** Implementar la pantalla `references/pantallas/feed.dc.html` como home `/` con estilo idéntico al mockup, sin autenticación ni base de datos.

## Alcance

### Dentro

- Sidebar desktop (248px, sticky): logo OpenDayCare «Sala Soles», botón «Nueva publicación», nav (Feed/Niños/Avisos/Mi cuenta), usuario «Caro Giménez · Maestra» + botón cerrar sesión.
- Feed: kicker «GUARDERÍA · SALA SOLES», saludo «Buenas, Caro», subtítulo «12 niños · martes 17 jun», caja «Compartí un momento…», separador «PUBLICADO HOY», 3 posts:
  - LOGRO (Mateo, 14:20): orinal, 3 corazones, 1 comentario.
  - ACTIVIDAD (Mateo, 09:40): témperas, placeholder de foto dashed, 5 corazones, 2 comentarios.
  - ANUNCIO (Anuncio general, 07:50): parque, 8 corazones, 0 comentarios.
- Móvil (<768px): drawer hamburguesa con el mismo contenido del sidebar.
- Tailwind v4 + tokens `@theme` en `app/globals.css` con la paleta del template.
- Fuentes Fredoka + Nunito vía `next/font/google`.

### Fuera

- Autenticación, base de datos, API.
- Páginas Niños, Avisos, Mi cuenta, crear publicación, detalle publicación, foto, login — sus links quedan `href="#"` inertes.
- Interactividad real (likes, comentarios, editar) — solo render estático.
- Foto real del post de actividad — queda el placeholder dashed como en el template.
- Estados de error / carga (no hay datos dinámicos).

## Modelo de datos

Sin persistencia. Constante `posts` en `app/page.tsx`:

```ts
type PostType = "logro" | "actividad" | "anuncio";

type Post = {
  childName: string;
  initials: string;
  time: string;
  type: PostType;
  audience: string; // "familia de Mateo" | "toda la sala"
  text: string;
  hearts: number;
  comments: number;
};

const posts: Post[] = [
  // los 3 posts tal cual el template (texto UI en español, identificadores en inglés)
];
```

Badge, color de avatar y color de badge derivados de `type` (map type → clases/colores). **Nombres de variables, funciones y tipos en inglés** (regla de código de AGENTS.md); solo el texto visible en UI queda en español.

## Plan de implementación

1. `app/globals.css`: tokens `@theme` con paleta del template (#F6ECDF fondo, #FFFDF9 panel, #ECE0D0 borde, #3F362E texto, #D9583C acento, #F2937A/#F4977E botón, #CFEBD8 logro, #C7E7F1 actividad, #CCD8F4 anuncio). Eliminar dark-mode default y estilos Geist.
2. `app/layout.tsx`: cargar Fredoka (600) y Nunito (400/700/800) con `next/font/google`, variables `--font-fredoka` / `--font-nunito`, `lang="es"`, metadata título «OpenDayCare».
3. `app/page.tsx`: componente único — sidebar desktop + drawer móvil (estado `open`), header del feed, caja «Compartí un momento…», separador, `.map` de posts con badges y contadores. SVGs inline copiados del template. Identificadores (variables, funciones, tipos) en inglés; texto UI en español.
4. Verificación: `npm run lint`, `npx tsc --noEmit`, `npm run dev` + screenshot comparado contra `references/screenshots/feed.png`.

## Criterios de aceptación

- [x] `/` renderiza el feed visualmente idéntico a `feed.dc.html` (comparación lado a lado con screenshot).
- [x] Sidebar desktop 248px sticky con logo, botón «Nueva publicación», 4 ítems de nav y bloque de usuario.
- [x] Ítem Feed marcado activo (fondo #FBE3D8, texto #D9583C).
- [x] 3 posts con badges LOGRO/ACTIVIDAD/ANUNCIO y colores del template.
- [x] Post de actividad muestra placeholder de foto dashed, 200px de alto.
- [x] <768px: sidebar oculto, botón hamburguesa abre drawer con el mismo contenido.
- [x] Fredoka y Nunito cargan vía `next/font` (sin `<link>` a Google Fonts).
- [x] Colores vía tokens `@theme` en `globals.css`.
- [x] `npm run lint` y `npx tsc --noEmit` pasan sin errores.
- [x] Identificadores de código en inglés (variables, funciones, tipos); texto UI en español.
- [x] Links a páginas inexistentes son `href="#"`.

## Decisiones tomadas

- **Tailwind v4 + `@theme`** sobre inline styles copiados: stack del repo, mantenible; fidelidad se garantiza con comparación de screenshot.
- **Array `posts` en `page.tsx`**: sin DB alcanza; extraer a archivo aparte cuando crezca.
- **`href="#"` inertes** para links muertos: cada pantalla tendrá su spec propio.
- **Drawer hamburguesa en móvil**: decisión del usuario; el template no tiene mockup móvil.
- **`next/font/google`**: self-hosted, sin FOUT, idiomático de Next.
- **Componente único en `page.tsx`**: extraer `<Sidebar/>` cuando exista una segunda pantalla.
- **Identificadores en inglés** (`PostType`, `childName`, `hearts`…), texto UI en español: regla de código limpio de AGENTS.md.

## Riesgos

- Deriva visual al traducir inline styles → Tailwind: mitigar con comparación screenshot vs `references/screenshots/feed.png`.
- Next 16 tiene breaking changes respecto a versiones conocidas: leer `node_modules/next/dist/docs/` antes de escribir código (regla de AGENTS.md).
