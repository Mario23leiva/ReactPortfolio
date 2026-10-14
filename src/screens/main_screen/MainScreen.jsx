import { useEffect, useState } from 'react';
import './MainScreen.css'
import Dock from './dock/Dock.jsx';
import WindowsLayer from './windows/WindowsLayer.jsx';
import WindowManagerProvider from './windows/WindowManagerProvider.jsx';
import { useWindowManager } from './windows/WindowManagerContext.js';
import PhoneScreen from './phone/PhoneScreen.jsx';
import { PHONE_QUERY, useMediaQuery } from '../../hooks/useMediaQuery.js';

// Distancia al borde inferior a la que aparece el dock en pantalla completa
const DOCK_REVEAL_DISTANCE = 40;

// Escritorio del Mac. Mientras haya alguna ventana visible maximizada, las ventanas ocupan toda
// la pantalla por encima del dock, que se muestra al acercar el ratón al borde inferior.
const Desktop = () => {
    const { windows } = useWindowManager();
    const fullscreen = windows.some((win) => win.maximized && !win.minimized);
    const [nearBottom, setNearBottom] = useState(false);

    // Se escucha el movimiento del ratón en vez de poner una franja encima de las ventanas,
    // para no quitarles clics ni scroll en su parte inferior
    useEffect(() => {
        if (!fullscreen) return undefined;
        const onPointerMove = (event) => {
            if (event.pointerType === 'mouse') {
                setNearBottom(event.clientY >= window.innerHeight - DOCK_REVEAL_DISTANCE);
            }
        };
        window.addEventListener('pointermove', onPointerMove);
        return () => window.removeEventListener('pointermove', onPointerMove);
    }, [fullscreen]);

    const className = [
        'main-screen',
        fullscreen && 'fullscreen',
        fullscreen && nearBottom && 'dock-revealed',
    ].filter(Boolean).join(' ');

    return (
        <div className={className}>
            <div className="main-container">
                <WindowsLayer />
            </div>
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
