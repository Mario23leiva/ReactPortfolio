import './MainScreen.css'
import Dock from './dock/Dock.jsx';
import WindowsLayer from './windows/WindowsLayer.jsx';
import WindowManagerProvider from './windows/WindowManagerProvider.jsx';
import PhoneScreen from './phone/PhoneScreen.jsx';
import { PHONE_QUERY, useMediaQuery } from '../../hooks/useMediaQuery.js';

// En pantallas pequeñas el portfolio es un iPhone; en el resto, un Mac.
// Las dos vistas comparten el gestor de ventanas: al cambiar de una a otra las apps siguen abiertas.
function MainScreen() {
    const isPhone = useMediaQuery(PHONE_QUERY);

    return (
        <WindowManagerProvider>
            {isPhone ? (
                <PhoneScreen />
            ) : (
                <div className="main-screen">
                    <div className="main-container">
                        <WindowsLayer />
                    </div>
                    <div className="menu">
                        <Dock />
                    </div>
                </div>
            )}
        </WindowManagerProvider>
    );
}

export default MainScreen;
