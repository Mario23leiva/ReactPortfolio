# TODO — Portfolio

Lista de tareas en orden de prioridad.

## Fase 1 · Limpieza y arreglos rápidos
- [x] Arreglar el deploy (`gh-pages -d build` → `dist`)
- [x] Quitar la app de música: componentes, `songs.json`, `public/music` e icono del dock
- [x] Limpiar código muerto: `ImageApp`, Bootstrap, CSS vacíos, imports sin usar, constantes duplicadas
- [x] Perfil: acordeón que abra/cierre correctamente y botón "Download Resume" funcional

## Fase 2 · Gestor de ventanas y dock
- [ ] Refactor del gestor de ventanas: estado en React (`useReducer` + Context) y registro único de apps, sin manipular el DOM
- [ ] Clic en el dock: si la app está tapada → al frente; si está al frente → minimizar; si está cerrada → abrir
- [ ] Punto indicador en el dock para apps abiertas (estilo macOS), en lugar del cambio de color de fondo
- [ ] Rediseño del dock: abierto por defecto y sin la animación de la pokeball
- [ ] Nuevo icono para Profile

## Fase 3 · Contenido
- [ ] Renovar proyectos: dejar solo ReactPortfolio, StayWorking y Restaurant 23 Menu (enlaces reales, vídeo embed, campos del JSON unificados)
- [ ] App Galería: ventana con cuadrícula de fotos y visor, en lugar de cambiar el fondo

## Fase 4 · Calidad
- [ ] Responsive: ventanas y dock usables en móvil
- [ ] Ventanas arrastrables desde la barra superior
- [ ] Accesibilidad: navegación por teclado, roles y textos `alt`

## Fase 5 · Acabado
- [ ] `index.html`: título, meta description, Open Graph, favicon y manifest
- [ ] README propio del proyecto
- [ ] (Opcional) Versión en español e inglés

## Pendiente de información
- Restaurant 23 Menu: repo, web, descripción, tecnologías y vídeo
- StayWorking: URL real del repo y web
- Fotos para la galería
- Icono de Profile
- Estilo del dock (pokeball estática o barra tipo macOS)
- Fondo de pantalla fijo
