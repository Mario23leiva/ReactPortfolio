import './MainScreen.css'
import Dock from './dock/Dock.jsx';
import WindowsLayer from './windows/WindowsLayer.jsx';
import WindowManagerProvider from './windows/WindowManagerProvider.jsx';
import { useWindowManager } from './windows/WindowManagerContext.js';
import PhoneScreen from './phone/PhoneScreen.jsx';
import { PHONE_QUERY, useMediaQuery } from '../../hooks/useMediaQuery.js';

// Escritorio del Mac. Mientras haya alguna ventana visible maximizada, las ventanas ocupan toda
// la pantalla por encima del dock, que se muestra al llevar el ratón al borde inferior.
const Desktop = () => {
    const { windows } = useWindowManager();
    const fullscreen = windows.some((win) => win.maximized && !win.minimized);

    return (
        <div className={fullscreen ? 'main-screen fullscreen' : 'main-screen'}>
            <div className="main-container">
                <WindowsLayer />
            </div>
            {fullscreen && <div className="dock-hotzone" aria-hidden="true"></div>}
            <div className="menu">
                <Dock />
            </div>
        </div>
    );
};

// En pantallas pequeñas el portfolio es un iPhone; en el resto, un Mac.
// Las dos vistas comparten el gestor de ventanas: al cambiar de una a otra las apps siguen abiertas.
function MainScreen() {
    const isPhone = useMediaQuery(PHONE_QUERY);

    return (
        <WindowManagerProvider>
            {isPhone ? <PhoneScreen /> : <Desktop />}
        </WindowManagerProvider>
    );
}

export default MainScreen;
