import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from '../../../../i18n/I18nContext.js';
import { NEW_TAB_URL } from '../browserState.js';

const NotFoundPage = ({ url, onNavigate }) => {
    const { t } = useI18n();

    return (
        <div className="notfound-page">
            <FontAwesomeIcon icon={faCircleExclamation} className="notfound-icon" />
            <h1>{t('browser.notFound.title')}</h1>
            <p>{t('browser.notFound.text', { url })}</p>
            <p>{t('browser.notFound.hint')}</p>
            <button type="button" className="project-btn primary" onClick={() => onNavigate(NEW_TAB_URL)}>
                {t('browser.notFound.goHome')}
            </button>
        </div>
    );
};

export default NotFoundPage;
