import { useI18n } from '../../../../i18n/I18nContext.js';

// Barra de ruta y de estado de la parte inferior
const FinderPathBar = ({ projectTitle, count }) => {
    const { t } = useI18n();
    const path = ['Macintosh HD', t('files.users'), 'mario', t('files.projects'), projectTitle];

    return (
        <footer className="finder-pathbar">
            <ol className="finder-path" aria-label={t('files.path')}>
                {path.map((segment, index) => (
                    <li key={index} aria-current={index === path.length - 1 ? 'location' : undefined}>{segment}</li>
                ))}
            </ol>
            <span className="finder-count" aria-live="polite">
                {count === 1 ? t('files.itemCountOne') : t('files.itemCount', { count })}
            </span>
        </footer>
    );
};

export default FinderPathBar;
