import { useRef, useState } from 'react';
import { ChevronRightIcon, FolderIcon, PhoneIcon, SearchIcon } from './FilesPhoneIcons.jsx';
import { EntryButton } from './FolderScreen.jsx';
import { useI18n } from '../../../../i18n/I18nContext.js';

// Fila de una lista agrupada de iOS
const GroupRow = ({ icon, label, onClick }) => (
    <li>
        <button type="button" className="files-group-row" onClick={onClick}>
            <span className="files-group-icon">{icon}</span>
            <span className="files-group-label">{label}</span>
            <span className="files-chevron"><ChevronRightIcon /></span>
        </button>
    </li>
);

const Group = ({ title, children }) => (
    <section className="files-group">
        <h2 className="files-group-title">{title}</h2>
        <ul className="files-group-list">{children}</ul>
    </section>
);

// Pantalla inicial "Explorar": buscador, ubicaciones, favoritos (proyectos) y etiquetas (tecnologías).
// tags: [{ name, color }]; search(query) devuelve las entradas que coinciden
const BrowseScreen = ({ projects, tags, onOpenDevice, onOpenProject, onOpenTag, search }) => {
    const { t } = useI18n();
    const [query, setQuery] = useState('');
    const [searching, setSearching] = useState(false);
    const inputRef = useRef(null);
    const results = query.trim() ? search(query.trim().toLowerCase()) : null;

    const cancelSearch = () => {
        setQuery('');
        setSearching(false);
        inputRef.current?.blur();
    };

    return (
        <>
            <div className={`files-search-row${searching ? ' searching' : ''}`}>
                <label className="files-search">
                    <SearchIcon />
                    <span className="visually-hidden">{t('files.search')}</span>
                    <input
                        ref={inputRef}
                        type="search"
                        placeholder={t('files.search')}
                        value={query}
                        onFocus={() => setSearching(true)}
                        onBlur={() => !query && setSearching(false)}
                        onChange={(event) => setQuery(event.target.value)}
                        onKeyDown={(event) => event.key === 'Escape' && cancelSearch()}
                    />
                </label>
                {searching && (
                    <button type="button" className="files-search-cancel" onMouseDown={(event) => event.preventDefault()} onClick={cancelSearch}>
                        {t('files.cancel')}
                    </button>
                )}
            </div>

            {results ? (
                results.length > 0 ? (
                    <ul className="files-list files-results">
                        {results.map((entry) => (
                            <li key={entry.id}>
                                <EntryButton entry={entry} view="list" />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="files-empty">{t('files.noResults')}</p>
                )
            ) : (
                <>
                    <Group title={t('files.locations')}>
                        <GroupRow icon={<PhoneIcon />} label={t('files.onMyIphone')} onClick={onOpenDevice} />
                    </Group>

                    <Group title={t('files.favorites')}>
                        {projects.map((project) => (
                            <GroupRow
                                key={project.id}
                                icon={<FolderIcon size={26} />}
                                label={project.title}
                                onClick={() => onOpenProject(project.id)}
                            />
                        ))}
                    </Group>

                    <Group title={t('files.tags')}>
                        {tags.map((tag) => (
                            <GroupRow
                                key={tag.name}
                                icon={<span className="files-tag-dot" style={{ backgroundColor: tag.color }}></span>}
                                label={tag.name}
                                onClick={() => onOpenTag(tag.name)}
                            />
                        ))}
                    </Group>
                </>
            )}
        </>
    );
};

export default BrowseScreen;
