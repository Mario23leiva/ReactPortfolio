import { getApp } from '../appsConfig.js';
import { useI18n } from '../../../i18n/I18nContext.js';
import BrowserApp from '../browser/BrowserApp.jsx';

// Contenido de una ventana según su tipo. Se usa tanto en el Mac como en el iPhone.
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

export default WindowContent;
