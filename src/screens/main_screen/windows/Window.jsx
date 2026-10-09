import { useEffect, useRef } from 'react';
import './Window.css';
import { useWindowManager } from './WindowManagerContext.js';
import { WindowFrameContext } from './WindowFrameContext.js';
import { useWindowDrag } from './useWindowDrag.js';
import WindowControls from './WindowControls.jsx';
import { getWindowTitle } from '../appsConfig.js';
import { useI18n } from '../../../i18n/I18nContext.js';

// topBarContent: contenido propio de la barra superior (p. ej. las pestañas del navegador)
// frameless: la ventana no pinta barra superior; la app la pinta con WindowFrameContext
// (semáforo, título y zona de arrastre), como el Finder de macOS
const Window = ({ win, topBarContent, frameless = false, children }) => {
    const { focusWindow } = useWindowManager();
    const windowRef = useRef(null);
    const { position, dragProps } = useWindowDrag(win, windowRef);
    const { t } = useI18n();
    const title = getWindowTitle(win, t);
    const titleId = `window-title-${win.id}`;

    // Al abrir o traer al frente, el foco pasa a la ventana para poder usarla con teclado
    useEffect(() => {
        if (!win.minimized) {
            windowRef.current?.focus({ preventScroll: true });
        }
    }, [win.z, win.minimized]);

    const frame = { win, title, titleId, dragProps };

    const className = [
        'desktop-app-layout',
        `window-${win.variant}`,
        frameless && 'window-frameless',
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
            {!frameless && (
                <div className="top-bar" {...dragProps}>
                    <WindowControls win={win} title={title} />
                    <h3 id={titleId} className={topBarContent ? 'visually-hidden' : undefined}>{title}</h3>
                    {topBarContent}
                </div>
            )}
            <div className="app-container">
                {frameless ? (
                    <WindowFrameContext.Provider value={frame}>{children}</WindowFrameContext.Provider>
                ) : children}
            </div>
        </section>
    );
};

export default Window;
