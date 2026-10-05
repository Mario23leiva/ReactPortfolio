import './FileInfo.css';
import { useWindowManager } from '../windows/WindowManagerContext.js';

import IMG_FILE from '../../../assets/iconos/archivo.webp';
import IMG_CHROME from '../../../assets/iconos/chrome.webp';
import IMG_GITHUB from '../../../assets/iconos/github.webp';
import { TECHNOLOGY_ICONS } from '../technologyIcons.js';
import { getProjectUrl } from '../browser/browserState.js';
import { useI18n } from '../../../i18n/I18nContext.js';

const LinkItem = ({ href, icon, label, title }) => {
    const { t } = useI18n();
    return (
        <li className="file-info-item" title={title}>
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={t('common.newTab', { name: label })}>
                <img src={icon} alt="" />
                <span>{label}</span>
            </a>
        </li>
    );
};

const FileInfo = ({ project }) => {
    const { openWindow, openInBrowser } = useWindowManager();
    const { t } = useI18n();

    if (!project) {
        return null;
    }

    const openVideo = () => {
        openWindow({
            id: `video-project-${project.id}`,
            title: `${project.title} - VIDEO.mp4`,
            icon: IMG_FILE,
            variant: 'video',
            data: { url: project.videoUrl },
        });
    };

    return (
        <div className="file-info">
            <div className="file-info-container">
                <ul className="file-info-list">
                    {/* La mini web del proyecto se abre en el navegador simulado */}
                    <li className="file-info-item" title={t('files.openWebsite')}>
                        <button type="button" onClick={() => openInBrowser(getProjectUrl(project))}>
                            <img src={IMG_CHROME} alt="" />
                            <span>index.html</span>
                        </button>
                    </li>

                    {/* videoUrl debe ser una URL embed de YouTube: https://www.youtube.com/embed/<id> */}
                    {project.videoUrl && (
                        <li className="file-info-item" title={t('files.videoResume')}>
                            <button type="button" onClick={openVideo}>
                                <img src={IMG_FILE} alt="" />
                                <span>VIDEO.mp4</span>
                            </button>
                        </li>
                    )}

                    {project.repoUrl && (
                        <LinkItem href={project.repoUrl} icon={IMG_GITHUB} label="GITHUB" title={t('files.goToRepository')} />
                    )}

                    {project.technologies.map((technology) => (
                        <li key={technology} className="file-info-item" title={technology}>
                            <img src={TECHNOLOGY_ICONS[technology]} alt="" />
                            <span>{technology}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default FileInfo;
