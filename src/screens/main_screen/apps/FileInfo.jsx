import './FileInfo.css';
import { useWindowManager } from '../windows/WindowManagerContext.js';

import IMG_CHROME from '../../../assets/iconos/chrome.webp';
import IMG_FILE from '../../../assets/iconos/archivo.webp';
import IMG_GITHUB from '../../../assets/iconos/github.webp';

//img technologies
import IMG_CSS from '../../../assets/iconos/css.webp';
import IMG_HTML from '../../../assets/iconos/html.webp';
import IMG_LARAVEL from '../../../assets/iconos/laravel.webp';
import IMG_REACT from '../../../assets/iconos/react.webp';
import IMG_SQL from '../../../assets/iconos/sql.webp';
import IMG_VUE from '../../../assets/iconos/vue.webp';
import IMG_JS from '../../../assets/iconos/js.webp';
import IMG_PHP from '../../../assets/iconos/php.webp';
import IMG_API from '../../../assets/iconos/api.webp';
import IMG_PYTHON from '../../../assets/iconos/python.webp';

const TECHNOLOGY_ICONS = {
    CSS: IMG_CSS,
    HTML: IMG_HTML,
    LARAVEL: IMG_LARAVEL,
    REACT: IMG_REACT,
    SQL: IMG_SQL,
    VUE: IMG_VUE,
    JAVASCRIPT: IMG_JS,
    PHP: IMG_PHP,
    API: IMG_API,
    PYTHON: IMG_PYTHON,
};

const LinkItem = ({ href, icon, label, title }) => (
    <li className="file-info-item" title={title}>
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`}>
            <img src={icon} alt="" />
            <span>{label}</span>
        </a>
    </li>
);

const FileInfo = ({ project }) => {
    const { openWindow } = useWindowManager();

    if (!project) {
        return null;
    }

    const openReadme = () => {
        openWindow({
            id: `readme-project-${project.id}`,
            title: `${project.title} - README.txt`,
            icon: IMG_FILE,
            variant: 'readme',
            data: { title: project.title, text: project.description },
        });
    };

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
                    {project.webUrl && (
                        <LinkItem href={project.webUrl} icon={IMG_CHROME} label={project.title} title="Open the project" />
                    )}

                    <li className="file-info-item" title="About the project...">
                        <button type="button" onClick={openReadme}>
                            <img src={IMG_FILE} alt="" />
                            <span>README.txt</span>
                        </button>
                    </li>

                    {/* videoUrl debe ser una URL embed de YouTube: https://www.youtube.com/embed/<id> */}
                    {project.videoUrl && (
                        <li className="file-info-item" title="Video Resume">
                            <button type="button" onClick={openVideo}>
                                <img src={IMG_FILE} alt="" />
                                <span>VIDEO.mp4</span>
                            </button>
                        </li>
                    )}

                    {project.repoUrl && (
                        <LinkItem href={project.repoUrl} icon={IMG_GITHUB} label="GITHUB" title="Go to repository" />
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
