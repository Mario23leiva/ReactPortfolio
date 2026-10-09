import WindowControls from '../../windows/WindowControls.jsx';
import { DiskIcon, FolderIcon } from './FinderIcons.jsx';
import { useI18n } from '../../../../i18n/I18nContext.js';

// Barra lateral translúcida: semáforo arriba y los proyectos como carpetas
const FinderSidebar = ({ frame, projects, currentId, onSelect }) => {
    const { t } = useI18n();

    return (
        <nav className="finder-sidebar" aria-label={t('files.projects')}>
            <div className="finder-sidebar-titlebar" {...frame?.dragProps}>
                {frame && <WindowControls win={frame.win} title={frame.title} />}
            </div>

            <h2 className="finder-sidebar-heading">{t('files.projects')}</h2>
            <ul className="finder-sidebar-list">
                {projects.map((project) => (
                    <li key={project.id}>
                        <button
                            type="button"
                            className="finder-sidebar-item"
                            aria-current={project.id === currentId ? 'page' : undefined}
                            title={project.title}
                            onClick={() => onSelect(project.id)}
                        >
                            <FolderIcon />
                            <span>{project.title}</span>
                        </button>
                    </li>
                ))}
            </ul>

            {/* Decorativa: le da el aspecto del Finder, no navega a ningún sitio */}
            <h2 className="finder-sidebar-heading">{t('files.locations')}</h2>
            <ul className="finder-sidebar-list">
                <li className="finder-sidebar-item finder-sidebar-item-static">
                    <DiskIcon />
                    <span>Macintosh HD</span>
                </li>
            </ul>
        </nav>
    );
};

export default FinderSidebar;
