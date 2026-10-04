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
- [ ] Renovar proyectos: dejar solo ReactPortfolio, StayWorking y Restaurant 23 Menu (enlaces reales, vídeo embed, campos del JSON unificados)
- [x] App Galería: ventana con cuadrícula de fotos y visor, en lugar de cambiar el fondo (lee las imágenes de `src/assets/gallery/`)
- [x] Fondo de pantalla fijo (`macOS-background.jpg`)

## Fase 4 · Calidad
- [ ] Responsive: ventanas y dock usables en móvil
- [ ] Ventanas arrastrables desde la barra superior
- [ ] Accesibilidad: navegación por teclado, roles y textos `alt`

## Fase 5 · Acabado
- [ ] `index.html`: título, meta description, Open Graph, favicon y manifest
- [ ] README propio del proyecto
- [ ] Optimizar imágenes pesadas (fondo de 2,9 MB, fotos de la galería) a WebP/tamaños adecuados
- [ ] (Opcional) Versión en español e inglés

## Pendiente de información
- Restaurant 23 Menu: descripción, tecnologías, repo y vídeo (web: mario23leiva.github.io/Restaurante23)
- StayWorking: descripción actualizada, tecnologías, repo y vídeo (web: mario23leiva.github.io/StayWorking)
- Fotos reales para la galería (de momento hay fotos de ejemplo)
