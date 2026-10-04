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
- [ ] (Opcional) Versión en español e inglés

## Pendiente de información
- Restaurant 23 Menu: URL del repo (añadir `repoUrl` en projects.json)
- Vídeos de los proyectos (añadir `videoUrl` con formato https://www.youtube.com/embed/<id>)
- Fotos reales para la galería (de momento hay fotos de ejemplo)
