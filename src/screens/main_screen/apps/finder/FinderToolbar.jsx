import { ChevronLeftIcon, ChevronRightIcon, IconsViewIcon, ListViewIcon, SearchIcon } from './FinderIcons.jsx';
import { useI18n } from '../../../../i18n/I18nContext.js';

const VIEWS = [
    { id: 'icons', labelKey: 'files.viewIcons', Icon: IconsViewIcon },
    { id: 'list', labelKey: 'files.viewList', Icon: ListViewIcon },
];

// Barra de herramientas unificada: hace también de barra de título de la ventana
const FinderToolbar = ({ frame, title, canGoBack, canGoForward, onBack, onForward, view, onViewChange, query, onQueryChange }) => {
    const { t } = useI18n();

    return (
        <div className="finder-toolbar" {...frame?.dragProps}>
            <div className="finder-nav">
                <button type="button" className="finder-tool-btn" title={t('files.back')} aria-label={t('files.back')} disabled={!canGoBack} onClick={onBack}>
                    <ChevronLeftIcon />
                </button>
                <button type="button" className="finder-tool-btn" title={t('files.forward')} aria-label={t('files.forward')} disabled={!canGoForward} onClick={onForward}>
                    <ChevronRightIcon />
                </button>
            </div>

            <h3 className="finder-title" id={frame?.titleId}>
                <span className="visually-hidden">{frame?.title} — </span>{title}
            </h3>

            <div className="finder-view-switch" role="group" aria-label={t('files.view')}>
                {VIEWS.map(({ id, labelKey, Icon }) => (
                    <button
                        key={id}
                        type="button"
                        className="finder-tool-btn"
                        title={t(labelKey)}
                        aria-label={t(labelKey)}
                        aria-pressed={view === id}
                        onClick={() => onViewChange(id)}
                    >
                        <Icon />
                    </button>
                ))}
            </div>

            <label className="finder-search">
                <SearchIcon />
                <span className="visually-hidden">{t('files.search')}</span>
                <input
                    type="search"
                    placeholder={t('files.search')}
                    value={query}
                    onChange={(event) => onQueryChange(event.target.value)}
                    onKeyDown={(event) => event.key === 'Escape' && onQueryChange('')}
                />
            </label>
        </div>
    );
};

export default FinderToolbar;
