import { ChevronRightIcon, FolderIcon } from './FilesPhoneIcons.jsx';
import { useI18n } from '../../../../i18n/I18nContext.js';

// Icono de una entrada: carpeta de iOS o la imagen del archivo
const EntryIcon = ({ entry, size }) => (
    entry.folder
        ? <FolderIcon size={size} />
        : <img src={entry.icon} alt="" width={size} height={size} draggable="false" />
);

// Una entrada (carpeta o archivo) como celda de la cuadrícula o fila de la lista.
// entry: { id, name, subtitle, title?, icon?, folder?, open? }
export const EntryButton = ({ entry, view }) => (
    <button
        type="button"
        className={view === 'grid' ? 'files-cell' : 'files-row'}
        title={entry.title}
        disabled={!entry.open}
        onClick={entry.open}
    >
        <span className="files-entry-icon">
            <EntryIcon entry={entry} size={view === 'grid' ? 64 : 40} />
        </span>
        <span className="files-entry-text">
            <span className="files-entry-name">{entry.name}</span>
            <span className="files-entry-subtitle">{entry.subtitle}</span>
        </span>
        {view === 'list' && entry.folder && <span className="files-chevron"><ChevronRightIcon /></span>}
    </button>
);

// Contenido de una carpeta en cuadrícula o en lista, con el número de elementos al pie
const FolderScreen = ({ entries, view }) => {
    const { t } = useI18n();
    const count = entries.length === 1 ? t('files.itemCountOne') : t('files.itemCount', { count: entries.length });

    return (
        <>
            <ul className={view === 'grid' ? 'files-grid' : 'files-list'}>
                {entries.map((entry) => (
                    <li key={entry.id}>
                        <EntryButton entry={entry} view={view} />
                    </li>
                ))}
            </ul>
            <p className="files-footer">{count}</p>
        </>
    );
};

export default FolderScreen;
