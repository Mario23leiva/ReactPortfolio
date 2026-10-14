import { useEffect, useRef, useState } from 'react';
import { useWindowManager } from './WindowManagerContext.js';

// Parte de la ventana que siempre queda visible al arrastrarla
const MIN_VISIBLE_WIDTH = 100;
const TOP_BAR_HEIGHT = 40;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

// Ignora los elementos interactivos de la barra (botones, campos de texto...)
const isInteractive = (target) => target.closest('button, input, a, [role="option"]');

// Mano cerrada en toda la pantalla mientras dura el arrastre (ver src/cursors.css)
const setGrabbing = (grabbing) => document.documentElement.classList.toggle('is-grabbing', grabbing);

// Arrastre de una ventana desde su barra superior. dragProps se reparte en la zona
// de arrastre; doble clic en ella maximiza o restaura.
// narrow: ventana que al maximizar solo crece en vertical; maximizada se mueve solo en horizontal
export function useWindowDrag(win, windowRef, { narrow = false } = {}) {
    const { toggleMaximize } = useWindowManager();
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const dragRef = useRef(null);
    const draggable = !win.maximized || narrow;

    // Si la ventana se cierra a mitad de arrastre, el cursor vuelve a la normalidad
    useEffect(() => () => {
        if (dragRef.current) setGrabbing(false);
    }, []);

    const onPointerDown = (event) => {
        if (event.button !== 0 || !draggable || isInteractive(event.target)) {
            return;
        }

        dragRef.current = {
            startX: event.clientX,
            startY: event.clientY,
            origin: position,
            windowRect: windowRef.current.getBoundingClientRect(),
            areaRect: windowRef.current.parentElement.getBoundingClientRect(),
        };
        event.currentTarget.setPointerCapture(event.pointerId);
        setGrabbing(true);
    };

    const onPointerMove = (event) => {
        const drag = dragRef.current;
        if (!drag) return;

        const { windowRect, areaRect } = drag;
        const dx = clamp(
            event.clientX - drag.startX,
            areaRect.left + MIN_VISIBLE_WIDTH - windowRect.right,
            areaRect.right - MIN_VISIBLE_WIDTH - windowRect.left,
        );
        const dy = win.maximized ? 0 : clamp(
            event.clientY - drag.startY,
            areaRect.top - windowRect.top,
            areaRect.bottom - TOP_BAR_HEIGHT - windowRect.top,
        );
        setPosition({ x: drag.origin.x + dx, y: drag.origin.y + dy });
    };

    const onPointerUp = () => {
        if (!dragRef.current) return;
        dragRef.current = null;
        setGrabbing(false);
    };

    const onDoubleClick = (event) => {
        if (!isInteractive(event.target)) {
            toggleMaximize(win.id);
        }
    };

    return {
        position,
        dragProps: {
            // Muestra la mano abierta al pasar por encima (solo si la ventana se puede mover)
            'data-window-drag': draggable ? '' : undefined,
            onPointerDown,
            onPointerMove,
            onPointerUp,
            onPointerCancel: onPointerUp,
            onDoubleClick,
        },
    };
}
