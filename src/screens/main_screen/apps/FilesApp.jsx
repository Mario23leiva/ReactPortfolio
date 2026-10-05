import { useState } from 'react';
import './FilesApp.css';
import FileItem from './FileItem';
import FileInfo from './FileInfo';
import projects from './../../../assets/json/projects.json';
import { useI18n } from '../../../i18n/I18nContext.js';

const FilesApp = () => {
    const { t } = useI18n();
    const [selectedIndex, setSelectedIndex] = useState(null);

    return (
        <div className="files-app">
            <div className="left-container">
                <h2>{t('files.title')}</h2>
                <ul className="file-list">
                    {projects.map((project, index) => (
                        <FileItem
                            key={project.id}
                            title={project.title}
                            selected={index === selectedIndex}
                            onClick={() => setSelectedIndex(index)} />
                    ))}
                </ul>
            </div>

            <div className="right-container">
                <FileInfo project={projects[selectedIndex]} />
            </div>
        </div>
    );
}

export default FilesApp;
