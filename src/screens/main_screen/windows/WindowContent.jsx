import { getApp } from '../appsConfig.js';
import { useI18n } from '../../../i18n/I18nContext.js';
import BrowserApp from '../browser/BrowserApp.jsx';

// Contenido de una ventana según su tipo. Se usa tanto en el Mac como en el iPhone.
// phone: en el iPhone, las apps con phoneComponent usan esa versión en lugar de la del Mac
const WindowContent = ({ win, phone = false }) => {
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
            const app = getApp(win.id);
            const AppComponent = phone ? app?.phoneComponent ?? app?.component : app?.component;
            return AppComponent ? <AppComponent /> : null;
        }
    }
};

export default WindowContent;
