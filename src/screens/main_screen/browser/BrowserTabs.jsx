import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faGlobe, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useWindowManager } from '../windows/WindowManagerContext.js';
import { useI18n } from '../../../i18n/I18nContext.js';
import { getCurrentUrl, getPageTitle, resolvePage } from './browserState.js';

// Pestañas del navegador: van en la barra superior de la ventana, como en Chrome
const BrowserTabs = ({ data }) => {
    const { browserAction } = useWindowManager();
    const { t } = useI18n();

    return (
        <div className="browser-tabs" role="tablist" aria-label={t('browser.tabs')}>
            {data.tabs.map((tab) => {
                const url = getCurrentUrl(tab);
                const title = getPageTitle(url, t);
                const isActive = tab.id === data.activeTabId;
                return (
                    <div key={tab.id} className={`browser-tab${isActive ? ' active' : ''}`}>
                        <button
                            type="button"
                            role="tab"
                            className="browser-tab-select"
                            aria-selected={isActive}
                            title={title}
                            onClick={() => browserAction({ type: 'SELECT_TAB', tabId: tab.id })}
                        >
                            <FontAwesomeIcon icon={resolvePage(url).type === 'project' ? faFile : faGlobe} className="browser-tab-icon" />
                            <span>{title}</span>
                        </button>
                        <button
                            type="button"
                            className="browser-tab-close"
                            aria-label={t('browser.closeTab', { name: title })}
                            onClick={() => browserAction({ type: 'CLOSE_TAB', tabId: tab.id })}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                );
            })}
            <button
                type="button"
                className="browser-new-tab"
                title={t('browser.newTab')}
                aria-label={t('browser.newTab')}
                onClick={() => browserAction({ type: 'NEW_TAB' })}
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    );
};

export default BrowserTabs;
