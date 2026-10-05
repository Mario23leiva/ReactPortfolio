import WindowContent from '../windows/WindowContent.jsx';
import BrowserTabs from '../browser/BrowserTabs.jsx';

// Una app a pantalla completa. Las que no están en primer plano siguen montadas pero ocultas,
// así conservan su estado (pestañas, foto abierta en la galería...) como en el Mac.
const PhoneApp = ({ win, title, active, style }) => (
    <section className="phone-app" hidden={!active} aria-label={title} style={active ? style : undefined}>
        <header className="phone-app-header">
            {win.variant === 'browser' ? <BrowserTabs data={win.data} /> : <h1>{title}</h1>}
        </header>
        <div className="phone-app-content">
            <WindowContent win={win} />
        </div>
    </section>
);

export default PhoneApp;
