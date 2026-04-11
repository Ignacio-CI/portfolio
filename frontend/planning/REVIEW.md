# Revisión de Código — Frontend

Fecha: 2026-03-30
Rama: `feat/website-enhancement`

---

## Resumen Ejecutivo

El frontend es una aplicación Astro 5 con componentes Svelte 5 e internacionalización (EN/ES). La arquitectura general es sólida, pero existen varios problemas funcionales, de accesibilidad y de mantenibilidad que se detallan a continuación, ordenados por prioridad.

---

## Problemas Críticos

### 1. `Services.astro` — HTML malformado
**Líneas 68-71:** Tags de cierre duplicados (`</div>` y `</section>`). Rompe el árbol DOM y puede causar errores de CSS.

### 2. `Contact.astro` — Formulario no funcional
**Línea 20:** El botón usa `type="button"`. El formulario nunca se envía. No hay handler de envío ni integración con backend. Los campos no tienen `<label>` asociado.

### 3. `TerminalChat.svelte` — Riesgo de inyección HTML
**Línea ~170:** Se usa `{@html data.response}` sin sanitización del contenido de la API. Si la respuesta contiene HTML arbitrario, puede ejecutarse en el cliente.

### 4. `Projects.astro` y `About.astro` — Atributos `alt` incorrectos
Todas las imágenes usan `data-alt` en lugar de `alt`. Los lectores de pantalla no pueden leer estos atributos. No es estándar HTML.

---

## Problemas Medios

### `TerminalChat.svelte`
- El `catch` devuelve siempre el mismo mensaje genérico. No distingue entre error de red, timeout o respuesta malformada.
- La URL de la API cae a `localhost` si falta la variable de entorno, sin advertencia en producción.
- `sessionId` no se persiste en `localStorage`. Se pierde al remontar el componente.

### `Navbar.astro`
- Props `href` y `pathname` extraídas de `Astro.props` pero nunca usadas. Código muerto.
- No hay menú móvil (hamburguesa). La navegación es solo para desktop.
- La detección de ruta activa es frágil: manipulación manual de strings que falla con query params o hashes.

### `Projects.astro`
- Los botones de filtro renderizan pero no tienen lógica ni estado. UI no funcional.
- Datos de proyectos hardcodeados en el markup. Difícil de mantener.
- Años hardcodeados (2025, 2026) que quedarán desactualizados.

### `Footer.astro`
- Todos los links usan `href="#"`. No navegan a ningún lado.
- El año de copyright está hardcodeado. Debería ser dinámico.
- Links externos sin `rel="noopener noreferrer"`.

### `i18n/utils.ts`
- Parsing de URL por split(`'/'`)[1]. Falla en la ruta raíz `/`, rutas con trailing slash o query params.
- Si una clave de traducción no existe en ningún idioma, retorna `undefined` silenciosamente.

### `i18n/ui.ts`
- Archivo único con ~280+ claves de traducción. Difícil de mantener a medida que crece.
- HTML embebido en traducciones (`<br/>`, `<span class=...>`). Mezcla contenido con presentación.
- No hay validación de que `es` tenga las mismas claves que `en`.

### `global.css`
- Más de 50 variables de color sin documentación ni organización semántica.
- La clase `.glass-panel` usa un valor RGBA hardcodeado que no se actualiza con el tema.
- El SVG styling global (`fill: currentColor`) puede entrar en conflicto con íconos SVG que tienen estilos propios.

---

## Problemas Menores

### `StitchLayout.astro`
- Faltan meta tags esenciales: `og:*`, `twitter:card`, `canonical`, `robots`.
- No hay estrategia `font-display` para los tres fonts variables importados. Puede causar FOUC.
- Falta `<meta name="viewport">` en algunas variantes.

### `Hero.astro`
- Los botones CTA no tienen handlers ni son links. No funcionan.
- `blur-[120px]` y `blur-[100px]` son costosos en GPU en dispositivos de baja gama.
- No respeta `prefers-reduced-motion`.

### `Process.astro`
- URLs de imágenes de Google Drive hardcodeadas sin fallback. Si cambia la URL, la sección se rompe.
- Entidades HTML (`&#123;`) en bloques de código en lugar de caracteres UTF-8. Los lectores de pantalla las leen literalmente.

### `pages/about.astro`
- `pt-24` hardcodeado para compensar el navbar. Debería estar en el layout o ser consistente entre páginas.

---

## Recomendaciones por Área

### Funcionalidad inmediata
1. Corregir el HTML malformado en `Services.astro`.
2. Implementar envío del formulario en `Contact.astro` o marcarlo claramente como "próximamente".
3. Hacer funcionales los links del `Footer.astro`.
4. Añadir handlers o convertir en `<a>` los botones CTA del `Hero.astro`.

### Accesibilidad
1. Reemplazar `data-alt` por `alt` en todas las imágenes.
2. Añadir `<label>` o `aria-label` a todos los inputs.
3. Añadir `aria-hidden="true"` a elementos decorativos.
4. Implementar `prefers-reduced-motion` en animaciones.

### Mantenibilidad
1. Extraer datos de proyectos a `data/projects.json` (ya existe el tipo `project.ts`).
2. Separar `i18n/ui.ts` en módulos por sección.
3. Documentar variables de color en `global.css` con comentarios semánticos.

### Seguridad
1. Sanitizar el contenido antes de usar `{@html}` en `TerminalChat.svelte`.
2. Añadir validación real al formulario de contacto (client + server side).

---

## Estado por Componente

| Componente | Estado | Notas |
|---|---|---|
| `TerminalChat.svelte` | Funcional con riesgos | Inyección HTML, error handling genérico |
| `About.astro` | Funcional | Alt text incorrecto, imágenes externas sin fallback |
| `Hero.astro` | Parcial | CTAs sin acción |
| `Navbar.astro` | Funcional | Sin menú móvil, código muerto |
| `Process.astro` | Funcional | Imágenes externas, entidades HTML en código |
| `Projects.astro` | Parcial | Filtros sin implementar, alt text incorrecto |
| `Services.astro` | HTML roto | Requiere corrección inmediata |
| `Contact.astro` | No funcional | Formulario no envía |
| `Footer.astro` | Parcial | Links sin destino |
| `i18n/ui.ts` | Funcional | Escala mal, HTML embebido |
| `i18n/utils.ts` | Funcional con bugs | URL parsing frágil |
| `global.css` | Funcional | Sin organización |
| `StitchLayout.astro` | Funcional | Meta tags incompletos |
