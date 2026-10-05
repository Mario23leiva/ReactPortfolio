import Window from './Window.jsx';
import { useWindowManager } from './WindowManagerContext.js';
import { getApp } from '../appsConfig.js';
import { useI18n } from '../../../i18n/I18nContext.js';

const WindowContent = ({ win }) => {
    const { t } = useI18n();

    switch (win.variant) {
        case 'readme':
            return (
                <div>
                    <h2>{win.data.title}</h2>
                    <br />
                    <p>{win.data.text}</p>
                </div>
            );
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
        <Window key={win.id} win={win}>
            <WindowContent win={win} />
        </Window>
    ));
};

export default WindowsLayer;
