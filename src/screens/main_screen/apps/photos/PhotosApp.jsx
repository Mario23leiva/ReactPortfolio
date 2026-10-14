import { useEffect, useId, useRef, useState } from 'react';
import './Photos.css';
import PhotosViewer from './PhotosViewer.jsx';
import { HeartIcon, LibraryIcon, SearchIcon, ZoomInIcon, ZoomOutIcon } from './PhotosIcons.jsx';
import { getSectionPhotos, photoCount, toggleFavorite, useFavorites } from './photosData.js';
import WindowControls from '../../windows/WindowControls.jsx';
import { useWindowFrame } from '../../windows/WindowFrameContext.js';
import { useI18n } from '../../../../i18n/I18nContext.js';

// Tamaños de miniatura del control de zoom (ancho mínimo de columna, en px)
const ZOOM_SIZES = [90, 130, 180, 250];

const SIDEBAR = [
    { headingKey: 'gallery.photos', items: [{ id: 'library', labelKey: 'gallery.library', Icon: LibraryIcon }] },
    { headingKey: 'gallery.collections', items: [{ id: 'favorites', labelKey: 'gallery.favorites', Icon: HeartIcon }] },
];

// Columnas que tiene ahora mismo la cuadrícula (para moverse con ↑/↓)
const countColumns = (container) => {
    const grid = container?.querySelector('.photos-grid');
    if (!grid) return 1;
    return getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length || 1;
};

// App Fotos de macOS Sequoia: barra lateral con la biblioteca y las favoritas,
// cuadrícula con zoom y búsqueda, y visor dentro de la propia ventana.
const PhotosApp = () => {
    const frame = useWindowFrame();
    const { t } = useI18n();
    const favorites = useFavorites();
    const [section, setSection] = useState('library');
    const [zoom, setZoom] = useState(1);
    const [query, setQuery] = useState('');
    const [selectedId, setSelectedId] = useState(null);
    // Visor abierto: las fotos que se estaban viendo al abrirlo y la actual
    const [viewer, setViewer] = useState(null);
    const contentRef = useRef(null);
    const baseId = useId();

    const sectionTitle = t(`gallery.${section}`);
    const normalizedQuery = query.trim().toLowerCase();
    const photos = getSectionPhotos(section, favorites)
        .filter((photo) => photo.name.toLowerCase().includes(normalizedQuery));
    const selectedIndex = photos.findIndex((photo) => photo.id === selectedId);
    const getOptionId = (photoId) => `${baseId}-${photoId}`;
    const activeOptionId = selectedIndex !== -1 ? getOptionId(selectedId) : undefined;

    // La foto seleccionada siempre a la vista (también al volver del visor)
    useEffect(() => {
        if (activeOptionId && !viewer) {
            document.getElementById(activeOptionId)?.scrollIntoView({ block: 'nearest' });
        }
    }, [activeOptionId, viewer]);

    const goToSection = (id) => {
        setSection(id);
        setSelectedId(null);
        setQuery('');
    };

    const openPhoto = (index) => setViewer({ photos, index });

    const closeViewer = () => {
        setSelectedId(viewer.photos[viewer.index].id);
        setViewer(null);
        // El foco vuelve a la cuadrícula cuando ya está pintada
        requestAnimationFrame(() => contentRef.current?.focus({ preventScroll: true }));
    };

    const changeZoom = (step) => setZoom((current) => Math.min(Math.max(current + step, 0), ZOOM_SIZES.length - 1));

    const handleContentKeyDown = (event) => {
        if (photos.length === 0) return;

        if (event.key === 'Enter' || event.key === ' ' || (event.metaKey && event.key === 'ArrowDown')) {
            event.preventDefault();
            if (selectedIndex !== -1) openPhoto(selectedIndex);
            return;
        }

        // "." marca o desmarca como favorita, como en Fotos
        if (event.key === '.') {
            if (selectedIndex !== -1) toggleFavorite(selectedId);
            return;
        }

        const columns = countColumns(contentRef.current);
        const steps = { ArrowUp: -columns, ArrowDown: columns, ArrowLeft: -1, ArrowRight: 1, Home: -Infinity, End: Infinity };
        const step = steps[event.key];
        if (step === undefined) return;

        event.preventDefault();
        const next = selectedIndex === -1
            ? 0
            : Math.min(Math.max(selectedIndex + step, 0), photos.length - 1);
        setSelectedId(photos[next].id);
    };

    // ⌘+ y ⌘− cambian el tamaño de las miniaturas
    const handleKeyDown = (event) => {
        if (viewer || (!event.metaKey && !event.ctrlKey)) return;
        if (event.key === '+' || event.key === '=') {
            event.preventDefault();
            changeZoom(1);
        } else if (event.key === '-') {
            event.preventDefault();
            changeZoom(-1);
        }
    };

    const renderEmpty = () => {
        if (normalizedQuery) return <p className="photos-empty">{t('gallery.noResults')}</p>;
        if (section === 'favorites') {
            return (
                <div className="photos-empty">
                    <HeartIcon size={40} />
                    <p className="photos-empty-title">{t('gallery.noFavorites')}</p>
                    <p>{t('gallery.noFavoritesHint')}</p>
                </div>
            );
        }
        return <p className="photos-empty">{t('gallery.empty')}</p>;
    };

    return (
        <div className="photos" onKeyDown={handleKeyDown}>
            <nav className="photos-sidebar" aria-label={t('gallery.sections')}>
                <div className="photos-sidebar-titlebar" {...frame?.dragProps}>
                    {frame && <WindowControls win={frame.win} title={frame.title} />}
                </div>

                {SIDEBAR.map(({ headingKey, items }) => (
                    <div key={headingKey}>
                        <h2 className="photos-sidebar-heading">{t(headingKey)}</h2>
                        <ul className="photos-sidebar-list">
                            {items.map(({ id, labelKey, Icon }) => (
                                <li key={id}>
                                    <button
                                        type="button"
                                        className="photos-sidebar-item"
                                        aria-current={section === id ? 'page' : undefined}
                                        onClick={() => {
                                            setViewer(null);
                                            goToSection(id);
                                        }}
                                    >
                                        <Icon />
                                        <span>{t(labelKey)}</span>
                                        <span className="photos-sidebar-count">{getSectionPhotos(id, favorites).length}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>

            <div className="photos-main">
                {viewer ? (
                    <PhotosViewer
                        frame={frame}
                        photos={viewer.photos}
                        index={viewer.index}
                        onIndexChange={(index) => setViewer({ ...viewer, index })}
                        onClose={closeViewer}
                        backLabel={sectionTitle}
                        favorites={favorites}
                    />
                ) : (
                    <>
                        <div className="photos-toolbar" {...frame?.dragProps}>
                            <div className="photos-heading">
                                <h3 className="photos-title" id={frame?.titleId}>
                                    <span className="visually-hidden">{frame?.title} — </span>{sectionTitle}
                                </h3>
                                <span className="photos-subtitle">{photoCount(photos.length, t)}</span>
                            </div>

                            <div className="photos-zoom" role="group" aria-label={t('gallery.zoom')}>
                                <button type="button" className="photos-tool-btn" title={t('gallery.zoomOut')} aria-label={t('gallery.zoomOut')} disabled={zoom === 0} onClick={() => changeZoom(-1)}>
                                    <ZoomOutIcon size={14} />
                                </button>
                                <input
                                    type="range"
                                    className="photos-zoom-slider"
                                    min="0"
                                    max={ZOOM_SIZES.length - 1}
                                    step="1"
                                    value={zoom}
                                    aria-label={t('gallery.zoom')}
                                    onChange={(event) => setZoom(Number(event.target.value))}
                                    style={{ '--photos-zoom-fill': `${(zoom / (ZOOM_SIZES.length - 1)) * 100}%` }}
                                />
                                <button type="button" className="photos-tool-btn" title={t('gallery.zoomIn')} aria-label={t('gallery.zoomIn')} disabled={zoom === ZOOM_SIZES.length - 1} onClick={() => changeZoom(1)}>
                                    <ZoomInIcon size={14} />
                                </button>
                            </div>

                            <label className="photos-search">
                                <SearchIcon />
                                <span className="visually-hidden">{t('gallery.search')}</span>
                                <input
                                    type="search"
                                    placeholder={t('gallery.search')}
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    onKeyDown={(event) => event.key === 'Escape' && setQuery('')}
                                />
                            </label>
                        </div>

                        <div
                            ref={contentRef}
                            className="photos-content"
                            role="listbox"
                            aria-label={sectionTitle}
                            aria-activedescendant={activeOptionId}
                            tabIndex={0}
                            onKeyDown={handleContentKeyDown}
                            onClick={() => setSelectedId(null)}
                            style={{ '--photos-size': `${ZOOM_SIZES[zoom]}px` }}
                        >
                            {photos.length > 0 ? (
                                <ul className="photos-grid">
                                    {photos.map((photo, index) => (
                                        <li
                                            key={photo.id}
                                            id={getOptionId(photo.id)}
                                            className="photos-thumb"
                                            role="option"
                                            aria-selected={photo.id === selectedId}
                                            aria-label={photo.name}
                                            title={photo.name}
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                setSelectedId(photo.id);
                                            }}
                                            onDoubleClick={() => openPhoto(index)}
                                        >
                                            <img src={photo.src} alt="" loading="lazy" draggable="false" />
                                            {favorites.has(photo.id) && (
                                                <span className="photos-thumb-favorite"><HeartIcon size={14} filled /></span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : renderEmpty()}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PhotosApp;
