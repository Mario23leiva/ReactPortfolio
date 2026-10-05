import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faFile, faGlobe, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import './Browser.css';
import { useWindowManager } from '../windows/WindowManagerContext.js';
import { useI18n } from '../../../i18n/I18nContext.js';
import { getActiveTab, getCurrentUrl, resolveAddressInput, resolvePage } from './browserState.js';
import ProjectPage from './pages/ProjectPage.jsx';
import NewTabPage from './pages/NewTabPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

// Se monta de nuevo con cada URL (key), así el texto escrito se descarta al navegar
const AddressBar = ({ url, onNavigate }) => {
    const { t } = useI18n();
    const [value, setValue] = useState(url);
    const isFile = resolvePage(url).type === 'project';

    const handleSubmit = (event) => {
        event.preventDefault();
        const target = resolveAddressInput(value);
        if (target) {
            onNavigate(target);
        }
        event.currentTarget.querySelector('input').blur();
    };

    return (
        <form className="browser-address" onSubmit={handleSubmit}>
            <FontAwesomeIcon icon={isFile ? faFile : faGlobe} className="browser-address-icon" />
            <input
                type="text"
                value={value}
                aria-label={t('browser.address')}
                spellCheck="false"
                autoComplete="off"
                onChange={(event) => setValue(event.target.value)}
                onFocus={(event) => event.target.select()}
                onKeyDown={(event) => event.key === 'Escape' && setValue(url)}
            />
        </form>
    );
};

const BrowserPage = ({ url, onNavigate }) => {
    const page = resolvePage(url);
    switch (page.type) {
        case 'project':
            return <ProjectPage project={page.project} onNavigate={onNavigate} />;
        case 'newtab':
            return <NewTabPage onNavigate={onNavigate} />;
        default:
            return <NotFoundPage url={url} onNavigate={onNavigate} />;
    }
};

const BrowserApp = ({ data }) => {
    const { browserAction } = useWindowManager();
    const { t } = useI18n();
    const [reloadCount, setReloadCount] = useState(0);
    const tab = getActiveTab(data);
    const url = getCurrentUrl(tab);

    const navigate = (target) => browserAction({ type: 'NAVIGATE', url: target });

    return (
        <div className="browser">
            <div className="browser-toolbar">
                <button type="button" className="browser-toolbar-btn" title={t('browser.back')} aria-label={t('browser.back')}
                    disabled={tab.index === 0} onClick={() => browserAction({ type: 'BACK' })}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button type="button" className="browser-toolbar-btn" title={t('browser.forward')} aria-label={t('browser.forward')}
                    disabled={tab.index === tab.history.length - 1} onClick={() => browserAction({ type: 'FORWARD' })}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
                <button type="button" className="browser-toolbar-btn" title={t('browser.reload')} aria-label={t('browser.reload')}
                    onClick={() => setReloadCount((count) => count + 1)}>
                    <FontAwesomeIcon icon={faRotateRight} />
                </button>
                <AddressBar key={`${tab.id}-${url}`} url={url} onNavigate={navigate} />
            </div>

            {/* El stage es el bloque de referencia de las capas a pantalla completa de la página (visor de imágenes),
                así cubren la zona visible y no se desplazan con el scroll del viewport */}
            <div className="browser-stage">
                {/* La key vuelve a montar la página (y su scroll) al navegar, cambiar de pestaña o recargar */}
                <div className="browser-viewport" key={`${tab.id}-${tab.index}-${reloadCount}`} role="tabpanel">
                    <BrowserPage url={url} onNavigate={navigate} />
                </div>
            </div>
        </div>
    );
};

export default BrowserApp;
