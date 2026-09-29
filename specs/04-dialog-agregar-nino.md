# Spec 04 — Dialog «Agregar niño» in-memory (`/kids`)

**Estado:** Approved
**Depende de:** SPEC 02
**Fecha:** 2026-09-29
**Objetivo:** Implementar `agregar-nino.dc.html` como dialog modal sobre `/kids` que agrega el niño al estado local de la página (se pierde al recargar), con validación inline.

## Alcance

### Dentro

- `app/components/add-kid-dialog.tsx`: modal overlay — backdrop oscurecido, card centrada (max 520px, bg `#FBF4EC`, radio 24px) fiel al mockup: header Cancelar / «Agregar niño» (Fredoka) / Guardar; campos NOMBRE COMPLETO, FECHA DE NACIMIENTO (`dd/mm/aaaa`), SALA (select nativo, única opción «Soles»), ALERGIAS (ETIQUETAS), NOTAS MÉDICAS (textarea).
- Apertura: botón «Agregar niño» de `/kids` abre modal. Cierre: Cancelar, Esc, click en backdrop.
- Validación inline al Guardar: nombre requerido; fecha formato `dd/mm/aaaa` + fecha real + no futura. Errores bajo cada campo (texto pequeño rojo); Guardar siempre activo.
- On success: nuevo `Child` derivado — iniciales = primera letra del nombre; avatar = siguiente color de paleta según posición; id = slug del nombre; `ageLabel` = años cumplidos calculados; `birthDate` normalizado `12 mar 2022`; `allergyTag` = primer alérgeno en mayúsculas (sin alérgenos → sin tag); `allergyNotes` = texto completo; `parents: []`; `enrolledAt` = mes actual.
- `/kids` lista pasa a `useState` sembrado con `children` de mock; niño nuevo se antepone; contador `8 niños` → dinámico (`${kids.length} niños`); badge VINCULAR sale solo (0 padres).
- Inputs del modal se limpian al cerrar tras guardar.

### Fuera (para specs futuros)

- Persistencia/API — el agregado vive solo en memoria de la sesión.
- Vincular padres desde el dialog, edición de niño.
- Selector de sala multi-opción, selector de avatar.
- Validación de alergias/notas (siempre opcionales).

## Modelo de datos

Sin tipos nuevos. Derivación de `Child` desde el form (helpers en `add-kid-dialog.tsx`):

```ts
// name "Martina López" → { id: "martina-lopez", initials: "M", ageLabel: "3 años",
//   birthDate: "12 mar 2022", allergyTag: "MANÍ", allergyNotes: "Maní, Lactosa" }
```

Avatar: ciclo `["sky","pink","green","yellow","violet"]` por `list.length % 5`.

## Plan de implementación

1. `app/components/add-kid-dialog.tsx`: modal + form + validación + helpers de derivación. Manual: abrir/cerrar con Esc/backdrop.
2. `app/kids/page.tsx`: `useState(children)`, botón abre modal, onAdd antepone, contador dinámico. Manual: agregar niño → card nueva primera, contador 9.
3. Error inline: probar submit vacío → errores bajo nombre y fecha.
4. Verificación: `npm run lint`, `npx tsc --noEmit`, `npm run dev` + screenshots `.playwright-mcp/` vs mockup + flujo funcional con Playwright.

## Criterios de aceptación

- [ ] Click «Agregar niño» abre modal overlay con backdrop; card fiel a `agregar-nino.dc.html`.
- [ ] Cancelar, Esc y click en backdrop cierran sin cambios en la lista.
- [ ] Guardar con nombre vacío o fecha inválida/futura muestra error inline; no agrega.
- [ ] Guardar válido antepone card con iniciales, avatar, slug id, edad y badge de alergia correctos; contador pasa a 9 niños.
- [ ] Perfil del niño nuevo (`/kids/[slug]`) renderiza con sus datos.
- [ ] Recargar `/kids` restaura los 8 mock (in-memory).
- [ ] `npm run lint` y `npx tsc --noEmit` sin errores.
- [ ] Identificadores en inglés; texto UI en español.

## Decisiones tomadas

- **Sí: agrega in-memory** — pedido del usuario; sin API la única alternativa era dialog muerto.
- **Sí: validación inline al submit** — pedido del usuario (Guardar siempre activo).
- **Sí: select nativo para SALA** — pedido del usuario; única opción «Soles».
- **Sí: derivación automática de id/iniciales/avatar/edad** — pedido del usuario; cero inputs extra.
- **Sí: primer alérgeno → `allergyTag`, texto completo → `allergyNotes`** — pedido del usuario.
- **Sí: contador dinámico** — pedido del usuario; spec 02 lo dejaba estático, con in-memory quedaba desactualizado.
- **Sí: fecha texto `dd/mm/aaaa` con parse propio** — pedido del usuario (mockup + validación).
- **No: persistencia, vincular padres, edición** — specs propios si llegan.
- **Nota:** `0 años` → «menos de 1 año».

## Qué **no** está en este spec

- Persistencia/API (niño nuevo muere al recargar).
- Vincular padres, editar niño.
- Multi-salas, selector de avatar.
