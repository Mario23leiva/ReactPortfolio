import './Window.css';
import { useWindowManager } from './WindowManagerContext.js';

const Window = ({ win, children }) => {
    const { closeWindow, minimizeWindow, toggleMaximize, focusWindow } = useWindowManager();

    const className = [
        'desktop-app-layout',
        `window-${win.variant}`,
        win.minimized && 'minimized',
        win.maximized && 'maximize',
    ].filter(Boolean).join(' ');

    return (
        <div className={className} style={{ zIndex: win.z }} onMouseDown={() => focusWindow(win.id)}>
            <div className="top-bar" onDoubleClick={() => toggleMaximize(win.id)}>
                <div className="buttons">
                    <button type="button" className="window-btn close" title="Close" onClick={() => closeWindow(win.id)}></button>
                    <button type="button" className="window-btn minimize" title="Minimize" onClick={() => minimizeWindow(win.id)}></button>
                    <button type="button" className="window-btn maximize" title="Maximize/window" onClick={() => toggleMaximize(win.id)}></button>
                </div>
                <h3>{win.title}</h3>
            </div>
            <div className="app-container">
                {children}
            </div>
        </div>
    );
};

export default Window;
