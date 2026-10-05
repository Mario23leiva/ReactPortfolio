import { useI18n } from '../../../i18n/I18nContext.js';

// Con href se comporta como un enlace externo; si no, como un botón
const DockItem = ({ name, icon, isOpen, onClick, href }) => {
    const { t } = useI18n();
    const content = (
        <>
            <span className="dock-item-label">{name}</span>
            <img src={icon} alt="" draggable="false" />
            <span className="dock-item-indicator" aria-hidden="true"></span>
        </>
    );

    if (href) {
        return (
            <a className="dock-item" href={href} target="_blank" rel="noopener noreferrer" aria-label={t('common.newTab', { name })}>
                {content}
            </a>
        );
    }

    return (
        <button
            type="button"
            className={`dock-item${isOpen ? ' open' : ''}`}
            onClick={onClick}
            aria-label={isOpen ? t('dock.open', { name }) : name}
        >
            {content}
        </button>
    );
};

export default DockItem;
