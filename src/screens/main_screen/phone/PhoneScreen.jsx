import { useState } from 'react';
import './Phone.css';
import StatusBar from './StatusBar.jsx';
import HomeScreen from './HomeScreen.jsx';
import PhoneApp from './PhoneApp.jsx';
import AppSwitcher from './AppSwitcher.jsx';
import HomeIndicator from './HomeIndicator.jsx';
import { useWindowManager } from '../windows/WindowManagerContext.js';
import { getTopWindow } from '../windows/windowReducer.js';
import { getApp, getWindowTitle } from '../appsConfig.js';
import { BROWSER_WINDOW, NEW_TAB_URL } from '../browser/browserState.js';
import { useI18n } from '../../../i18n/I18nContext.js';

// Portfolio en móvil con aspecto de iPhone. La app en primer plano es la ventana de mayor z
// que no está minimizada; ir al inicio minimiza todas.
const PhoneScreen = () => {
    const { windows, openWindow, openInBrowser, minimizeAll } = useWindowManager();
    const { t } = useI18n();
    const [switcherOpen, setSwitcherOpen] = useState(false);
    const [swipe, setSwipe] = useState(0);
    const topWindow = getTopWindow(windows);
    const inApp = Boolean(topWindow) && !switcherOpen;
    const darkApp = inApp && topWindow.variant === 'app' && Boolean(getApp(topWindow.id)?.phoneDark);

    const openApp = (id) => openWindow({ id });

    // Chrome sin ventana abierta empieza en una pestaña nueva
    const openBrowser = () => {
        if (windows.some((win) => win.id === BROWSER_WINDOW.id)) {
            openWindow({ id: BROWSER_WINDOW.id });
        } else {
            openInBrowser(NEW_TAB_URL);
        }
    };

    const goHome = () => {
        setSwitcherOpen(false);
        minimizeAll();
    };

    // La app se encoge mientras se desliza la barra de inicio
    const swipeStyle = swipe > 0
        ? { transform: `translateY(${-swipe / 3}px) scale(${Math.max(1 - swipe / 800, 0.7)})`, borderRadius: 32, transition: 'none' }
        : undefined;

    return (
        <div className={`phone${inApp ? ' in-app' : ''}`}>
            <StatusBar dark={inApp && !darkApp} />

            <div className="phone-home-layer" hidden={inApp} aria-label={t('phone.homeScreen')}>
                <HomeScreen onOpenApp={openApp} onOpenBrowser={openBrowser} />
            </div>

            {windows.map((win) => (
                <PhoneApp
                    key={win.id}
                    win={win}
                    title={getWindowTitle(win, t)}
                    active={inApp && win.id === topWindow.id}
                    style={swipeStyle}
                />
            ))}

            {switcherOpen && <AppSwitcher onHome={goHome} onClose={() => setSwitcherOpen(false)} />}

            <HomeIndicator
                light={!inApp || darkApp}
                onHome={goHome}
                onSwitcher={() => setSwitcherOpen(true)}
                onDrag={setSwipe}
            />
        </div>
    );
};

export default PhoneScreen;
