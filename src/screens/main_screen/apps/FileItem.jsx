import DirectoryFile from './../../../assets/iconos/icono_carpeta.webp';

const FileItem = ({ title, selected, onClick }) => {
    return (
        <li>
            <button
                type="button"
                className={`file-item${selected ? ' file-selected' : ''}`}
                title={title}
                aria-current={selected ? 'true' : undefined}
                onClick={onClick}
            >
                <img src={DirectoryFile} alt="" />
                {title}
            </button>
        </li>
    );
}

export default FileItem;
