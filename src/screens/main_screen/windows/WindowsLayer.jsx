import Window from './Window.jsx';
import { useWindowManager } from './WindowManagerContext.js';
import { getApp } from '../appsConfig.js';
import { useI18n } from '../../../i18n/I18nContext.js';
import BrowserApp from '../browser/BrowserApp.jsx';
import BrowserTabs from '../browser/BrowserTabs.jsx';

const WindowContent = ({ win }) => {
    const { t } = useI18n();

    switch (win.variant) {
        case 'browser':
            return <BrowserApp data={win.data} />;
        case 'video':
            return (
                <iframe
                    className="video-frame"
                    src={win.data.url}
                    title={t('window.videoPlayer')}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            );
        default: {
            const AppComponent = getApp(win.id)?.component;
            return AppComponent ? <AppComponent /> : null;
        }
    }
};

// Las ventanas mantienen su orden en el array para no desmontarse al cambiar
// de primer plano; el apilado se controla con z-index.
const WindowsLayer = () => {
    const { windows } = useWindowManager();

    return windows.map((win) => (
        <Window
            key={win.id}
            win={win}
            topBarContent={win.variant === 'browser' ? <BrowserTabs data={win.data} /> : null}
        >
            <WindowContent win={win} />
        </Window>
    ));
};

export default WindowsLayer;
