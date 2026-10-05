# TODO — Portfolio

Lista de tareas en orden de prioridad.

## Fase 1 · Limpieza y arreglos rápidos
- [x] Arreglar el deploy (`gh-pages -d build` → `dist`)
- [x] Quitar la app de música: componentes, `songs.json`, `public/music` e icono del dock
- [x] Limpiar código muerto: `ImageApp`, Bootstrap, CSS vacíos, imports sin usar, constantes duplicadas
- [x] Perfil: acordeón que abra/cierre correctamente y botón "Download Resume" funcional

## Fase 2 · Gestor de ventanas y dock
- [x] Refactor del gestor de ventanas: estado en React (`useReducer` + Context) y registro único de apps, sin manipular el DOM
- [x] Clic en el dock: si la app está tapada → al frente; si está al frente → minimizar; si está cerrada → abrir
- [x] Punto indicador en el dock para apps abiertas (estilo macOS), en lugar del cambio de color de fondo
- [x] Rediseño del dock: abierto por defecto y sin la animación de la pokeball
- [x] Nuevo icono para Profile

## Fase 3 · Contenido
- [x] Renovar proyectos: dejar solo ReactPortfolio, StayWorking y Restaurant 23 Menu (enlaces reales, campos del JSON unificados)
- [x] App Galería: ventana con cuadrícula de fotos y visor, en lugar de cambiar el fondo (lee las imágenes de `src/assets/gallery/`)
- [x] Fondo de pantalla fijo (`macOS-background.jpg`)

## Fase 4 · Calidad
- [x] Responsive: ventanas y dock usables en móvil
- [x] Ventanas arrastrables desde la barra superior
- [x] Accesibilidad: navegación por teclado, roles y textos `alt`

## Fase 5 · Acabado
- [x] `index.html`: título, meta description, Open Graph, favicon y manifest
- [x] README propio del proyecto
- [x] Optimizar imágenes pesadas a WebP/tamaños adecuados (8,8 MB → 0,8 MB)
- [ ] ~~(Opcional) Versión en español e inglés~~ → pasa a la Fase 6 (i18n)

## Fase 6 · Mejoras
- [x] 6.0 i18n: todos los textos en castellano e inglés
  - [x] Base: diccionarios `src/i18n/es.json` / `en.json`, hook `useI18n()` con `t()`
  - [x] Resto de textos: pantalla de bloqueo, Perfil, Archivos, Galería. Los JSON de contenido usan `{ "es": ..., "en": ... }` y `localize()`
  - [x] Idioma automático según el navegador (castellano si lo prefiere; en cualquier otro caso, inglés)
- [x] 6.1 Icono "Prohibido divertirse" en el dock → enlace al portfolio serio (mario23leiva.github.io)
- [x] 6.2 Ventanas abiertas en el dock: cada README/vídeo abierto aparece tras un separador, con el texto "Proyecto - README.txt"
- [x] 6.3 Mini web por proyecto dentro de un navegador simulado (pestañas, barra de direcciones, atrás/adelante)
  - [x] Sustituye al README: en Archivos se abre desde el archivo `index.html`
  - [x] Plantilla: portada, tecnologías, secciones, galería y otros proyectos (contenido en `projects.json` → `page`)
  - [x] Pestaña nueva con buscador de proyectos y página de "sitio no encontrado"
  - [ ] Sustituir los textos e imágenes de ejemplo por los reales
- [x] 6.4 Navegador en el dock: un único icono de Chrome con una pestaña por proyecto abierto
- [ ] 6.5 Modo iPhone en móvil: barra de estado, pantalla de inicio con apps, apps a pantalla completa, selector de apps y el icono "Prohibido divertirse" como app

## Pendiente de información
- Restaurant 23 Menu: URL del repo (añadir `repoUrl` en projects.json)
- Vídeos de los proyectos (añadir `videoUrl` con formato https://www.youtube.com/embed/<id>)
- Fotos reales para la galería (de momento hay fotos de ejemplo)
