import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faCode } from '@fortawesome/free-solid-svg-icons';
import projects from '../../../../assets/json/projects.json';
import { getAsset } from '../../../../utils/assets.js';
import { useI18n } from '../../../../i18n/I18nContext.js';
import { TECHNOLOGY_ICONS } from '../../technologyIcons.js';
import { getProjectUrl } from '../browserState.js';

// Mini web de un proyecto (su "index.html"). El contenido sale de projects.json → page
const ProjectPage = ({ project, onNavigate }) => {
    const { t, localize } = useI18n();
    const { cover, sections = [], gallery = [] } = project.page ?? {};
    const otherProjects = projects.filter((item) => item.id !== project.id);
    const coverUrl = getAsset(cover);

    return (
        <article className="project-page">
            <header className="project-hero" style={coverUrl ? { backgroundImage: `url(${coverUrl})` } : undefined}>
                <div className="project-hero-content">
                    <h1>{project.title}</h1>
                    <p>{localize(project.description)}</p>
                    <div className="project-hero-actions">
                        {project.webUrl && (
                            <a className="project-btn primary" href={project.webUrl} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> {t('browser.project.visitWebsite')}
                            </a>
                        )}
                        {project.repoUrl && (
                            <a className="project-btn" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faCode} /> {t('browser.project.viewCode')}
                            </a>
                        )}
                    </div>
                </div>
            </header>

            <div className="project-body">
                <section className="project-section">
                    <h2>{t('browser.project.technologies')}</h2>
                    <ul className="project-technologies">
                        {project.technologies.map((technology) => (
                            <li key={technology}>
                                <img src={TECHNOLOGY_ICONS[technology]} alt="" />
                                {technology}
                            </li>
                        ))}
                    </ul>
                </section>

                {sections.map((section) => (
                    <section key={localize(section.title)} className="project-section">
                        <h2>{localize(section.title)}</h2>
                        <p>{localize(section.body)}</p>
                    </section>
                ))}

                {gallery.length > 0 && (
                    <section className="project-section">
                        <h2>{t('browser.project.gallery')}</h2>
                        <ul className="project-gallery">
                            {gallery.map((image, index) => (
                                <li key={`${image}-${index}`}>
                                    <img src={getAsset(image)} alt={`${project.title} ${index + 1}`} loading="lazy" draggable="false" />
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {otherProjects.length > 0 && (
                    <section className="project-section">
                        <h2>{t('browser.project.otherProjects')}</h2>
                        <ul className="project-others">
                            {otherProjects.map((item) => (
                                <li key={item.id}>
                                    <button type="button" onClick={() => onNavigate(getProjectUrl(item))}>
                                        <img src={getAsset(item.page?.cover)} alt="" draggable="false" />
                                        <span>{item.title}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>

            <footer className="project-footer">© {new Date().getFullYear()} Mario Leiva Torres</footer>
        </article>
    );
};

export default ProjectPage;
