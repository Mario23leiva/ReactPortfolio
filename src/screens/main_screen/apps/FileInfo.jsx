import './FileInfo.css';
import { useWindowManager } from '../windows/WindowManagerContext.js';

//img technologies
import IMG_CHROME from '../../../assets/iconos/chrome.png';
import IMG_FILE from '../../../assets/iconos/archivo.png';
import IMG_CSS from '../../../assets/iconos/css.png';
import IMG_GITHUB from '../../../assets/iconos/github.png';
import IMG_HTML from '../../../assets/iconos/html.png';
import IMG_LARAVEL from '../../../assets/iconos/laravel.png';
import IMG_REACT from '../../../assets/iconos/react.png';
import IMG_SQL from '../../../assets/iconos/sql.png';
import IMG_VUE from '../../../assets/iconos/vue.png';
import IMG_JS from '../../../assets/iconos/js.png';
import IMG_PHP from '../../../assets/iconos/php.png';
import IMG_API from '../../../assets/iconos/api.png';
import IMG_PYTHON from '../../../assets/iconos/python.png';

const CSS_TECHNOLOGY = "CSS"
const HTML_TECHNOLOGY = "HTML"
const LARAVEL_TECHNOLOGY = "LARAVEL"
const REACT_TECHNOLOGY = "REACT"
const SQL_TECHNOLOGY = "SQL"
const VUE_TECHNOLOGY = "VUE"
const JAVASCRIPT_TECHNOLOGY = "JAVASCRIPT"
const PHP_TECHNOLOGY = "PHP"
const API_TECHNOLOGY = "API"
const PYTHON_TECHNOLOGY = "PYTHON"

const FileInfo = ({ project }) => {

    const { openWindow } = useWindowManager();

    const loadAppTechnologies = (tecnologia, index) => {
        let imgTech;
        switch (tecnologia) {
            case CSS_TECHNOLOGY:
                imgTech = IMG_CSS;
                break;
            case HTML_TECHNOLOGY:
                imgTech = IMG_HTML;
                break;
            case LARAVEL_TECHNOLOGY:
                imgTech = IMG_LARAVEL;
                break;
            case REACT_TECHNOLOGY:
                imgTech = IMG_REACT;
                break;
            case SQL_TECHNOLOGY:
                imgTech = IMG_SQL;
                break;
            case VUE_TECHNOLOGY:
                imgTech = IMG_VUE;
                break;
            case JAVASCRIPT_TECHNOLOGY:
                imgTech = IMG_JS;
                break;
            case PHP_TECHNOLOGY:
                imgTech = IMG_PHP;
                break;
            case API_TECHNOLOGY:
                imgTech = IMG_API;
                break;
            case PYTHON_TECHNOLOGY:
                imgTech = IMG_PYTHON;
                break;
        }
        return (
            <li key={index} className="file-info-item" title={tecnologia}>
                <img src={imgTech} alt={tecnologia} />
                <span>{tecnologia}</span>
            </li>
        );
    };


    if (!project) {
        return null;
    }

    const openReadme = () => {
        openWindow({
            id: `readme-project-${project.id}`,
            title: 'README.txt',
            variant: 'readme',
            data: { title: project.titulo, text: project.descripcion },
        });
    };

    const openVideo = () => {
        openWindow({
            id: `video-project-${project.id}`,
            title: 'VIDEO.mp4',
            variant: 'video',
            data: { url: project.video_url },
        });
    };

    return (
        <div className="file-info">
            <div className="file-info-container">
                <ul className="file-info-list">
                    <a href="https://google.com" target="_blank">
                        <li className="file-info-item" title="Open the project">
                            <img src={IMG_CHROME} alt="File" />
                            <span>{project.titulo}</span>
                        </li>
                    </a>

                    <li className="file-info-item file-info-clickable" title="About the project..." onClick={openReadme}>
                        <img src={IMG_FILE} alt="File" />
                        <span>README.txt</span>
                    </li>

                    <li className="file-info-item file-info-clickable" title="Video Resume" onClick={openVideo}>
                        <img src={IMG_FILE} alt="File" />
                        <span>VIDEO.mp4</span>
                    </li>

                    <a href="">
                        <li className="file-info-item" title="Go to repository">
                            <img src={IMG_GITHUB} alt="GitHub" />
                            <span>GITHUB</span>
                        </li>
                    </a>
                    {project.tecnologias.map((tecnologia, index) => (
                        loadAppTechnologies(tecnologia, index)
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default FileInfo;
