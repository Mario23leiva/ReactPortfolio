import './FileInfo.css';
import { useWindowManager } from '../windows/WindowManagerContext.js';

import IMG_CHROME from '../../../assets/iconos/chrome.png';
import IMG_FILE from '../../../assets/iconos/archivo.png';
import IMG_GITHUB from '../../../assets/iconos/github.png';

//img technologies
import IMG_CSS from '../../../assets/iconos/css.png';
import IMG_HTML from '../../../assets/iconos/html.png';
import IMG_LARAVEL from '../../../assets/iconos/laravel.png';
import IMG_REACT from '../../../assets/iconos/react.png';
import IMG_SQL from '../../../assets/iconos/sql.png';
import IMG_VUE from '../../../assets/iconos/vue.png';
import IMG_JS from '../../../assets/iconos/js.png';
import IMG_PHP from '../../../assets/iconos/php.png';
import IMG_API from '../../../assets/iconos/api.png';
import IMG_PYTHON from '../../../assets/iconos/python.png';

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
        <a href={href} target="_blank" rel="noopener noreferrer">
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
            title: 'README.txt',
            variant: 'readme',
            data: { title: project.title, text: project.description },
        });
    };

    const openVideo = () => {
        openWindow({
            id: `video-project-${project.id}`,
            title: 'VIDEO.mp4',
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

                    <li className="file-info-item file-info-clickable" title="About the project..." onClick={openReadme}>
                        <img src={IMG_FILE} alt="" />
                        <span>README.txt</span>
                    </li>

                    {/* videoUrl debe ser una URL embed de YouTube: https://www.youtube.com/embed/<id> */}
                    {project.videoUrl && (
                        <li className="file-info-item file-info-clickable" title="Video Resume" onClick={openVideo}>
                            <img src={IMG_FILE} alt="" />
                            <span>VIDEO.mp4</span>
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
