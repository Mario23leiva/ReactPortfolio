import WindowContent from '../windows/WindowContent.jsx';
import BrowserTabs from '../browser/BrowserTabs.jsx';
import { getApp } from '../appsConfig.js';

// Una app a pantalla completa. Las que no están en primer plano siguen montadas pero ocultas,
// así conservan su estado (pestañas, foto abierta en la galería...) como en el Mac.
// Las apps frameless (Archivos) pintan su propia cabecera, como en iOS.
const PhoneApp = ({ win, title, active, style }) => {
    const frameless = win.variant === 'app' && Boolean(getApp(win.id)?.frameless);

    return (
        <section
            className={`phone-app${frameless ? ' phone-app-frameless' : ''}`}
            hidden={!active}
            aria-label={title}
            style={active ? style : undefined}
        >
            {!frameless && (
                <header className="phone-app-header">
                    {win.variant === 'browser' ? <BrowserTabs data={win.data} /> : <h1>{title}</h1>}
                </header>
            )}
            <div className="phone-app-content">
                <WindowContent win={win} phone />
            </div>
        </section>
    );
};

export default PhoneApp;
