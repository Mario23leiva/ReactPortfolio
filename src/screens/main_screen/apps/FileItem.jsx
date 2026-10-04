import DirectoryFile from './../../../assets/iconos/icono_carpeta.png';

const FileItem = ({ title, selected, onClick }) => {
    return (
        <li className={`file-item${selected ? ' file-selected' : ''}`} title={title} onClick={onClick}>
            <img src={DirectoryFile} alt={title} />
            {title}
        </li>
    );
}

export default FileItem;
