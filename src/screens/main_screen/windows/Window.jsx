import { useEffect, useRef, useState } from 'react';
import './Window.css';
import { useWindowManager } from './WindowManagerContext.js';
import { getWindowTitle } from '../appsConfig.js';
import { useI18n } from '../../../i18n/I18nContext.js';

// Parte de la ventana que siempre queda visible al arrastrarla
const MIN_VISIBLE_WIDTH = 100;
const TOP_BAR_HEIGHT = 40;
const MOBILE_QUERY = '(max-width: 640px)';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const Window = ({ win, children }) => {
    const { closeWindow, minimizeWindow, toggleMaximize, focusWindow } = useWindowManager();
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const windowRef = useRef(null);
    const dragRef = useRef(null);
    const { t } = useI18n();
    const title = getWindowTitle(win, t);
    const titleId = `window-title-${win.id}`;

    // Al abrir o traer al frente, el foco pasa a la ventana para poder usarla con teclado
    useEffect(() => {
        if (!win.minimized) {
            windowRef.current?.focus({ preventScroll: true });
        }
    }, [win.z, win.minimized]);

    const handlePointerDown = (event) => {
        const isMobile = window.matchMedia(MOBILE_QUERY).matches;
        if (event.button !== 0 || win.maximized || isMobile || event.target.closest('button')) {
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
    };

    const handlePointerMove = (event) => {
        const drag = dragRef.current;
        if (!drag) return;

        const { windowRect, areaRect } = drag;
        const dx = clamp(
            event.clientX - drag.startX,
            areaRect.left + MIN_VISIBLE_WIDTH - windowRect.right,
            areaRect.right - MIN_VISIBLE_WIDTH - windowRect.left,
        );
        const dy = clamp(
            event.clientY - drag.startY,
            areaRect.top - windowRect.top,
            areaRect.bottom - TOP_BAR_HEIGHT - windowRect.top,
        );
        setPosition({ x: drag.origin.x + dx, y: drag.origin.y + dy });
    };

    const handlePointerUp = () => {
        dragRef.current = null;
    };

    const className = [
        'desktop-app-layout',
        `window-${win.variant}`,
        win.minimized && 'minimized',
        win.maximized && 'maximize',
    ].filter(Boolean).join(' ');

    const style = { zIndex: win.z };
    if (!win.maximized) {
        style['--window-x'] = `${position.x}px`;
        style['--window-y'] = `${position.y}px`;
    }

    return (
        <section
            ref={windowRef}
            className={className}
            style={style}
            role="dialog"
            aria-labelledby={titleId}
            tabIndex={-1}
            onMouseDown={() => focusWindow(win.id)}
        >
            <div
                className="top-bar"
                onDoubleClick={() => toggleMaximize(win.id)}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
            >
                <div className="buttons">
                    <button type="button" className="window-btn close" title={t('window.close')} aria-label={t('window.closeNamed', { name: title })} onClick={() => closeWindow(win.id)}></button>
                    <button type="button" className="window-btn minimize" title={t('window.minimize')} aria-label={t('window.minimizeNamed', { name: title })} onClick={() => minimizeWindow(win.id)}></button>
                    <button type="button" className="window-btn maximize" title={t('window.maximize')} aria-label={t('window.maximizeNamed', { name: title })} onClick={() => toggleMaximize(win.id)}></button>
                </div>
                <h3 id={titleId}>{title}</h3>
            </div>
            <div className="app-container">
                {children}
            </div>
        </section>
    );
};

export default Window;
