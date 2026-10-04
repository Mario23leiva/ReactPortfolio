import { useState } from 'react';
import './FilesApp.css';
import FileItem from './FileItem';
import FileInfo from './FileInfo';
import projects from './../../../assets/json/projects.json';

const FilesApp = () => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    return (
        <div className="files-app">
            <div className="left-container">
                <h2>Personal Projects</h2>
                <ul className="file-list">
                    {projects.map((project, index) => (
                        <FileItem
                            key={project.id}
                            title={project.titulo}
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
