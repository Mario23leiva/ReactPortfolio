import { useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, HeartIcon } from './PhotosIcons.jsx';
import { toggleFavorite } from './photosData.js';
import { useI18n } from '../../../../i18n/I18nContext.js';

// Visor de Fotos en el Mac: ocupa la zona principal de la ventana, con su barra de herramientas
// (volver, nombre, favorita, anterior/siguiente) y una tira de miniaturas abajo.
// Teclado: ← → para cambiar de foto, Esc para volver y "." para marcar como favorita.
const PhotosViewer = ({ frame, photos, index, onIndexChange, onClose, backLabel, favorites }) => {
    const { t } = useI18n();
    const viewerRef = useRef(null);
    const photo = photos[index];
    const isFavorite = favorites.has(photo.id);
    const favoriteLabel = isFavorite ? t('gallery.removeFavorite') : t('gallery.addFavorite');

    useEffect(() => {
        viewerRef.current?.focus({ preventScroll: true });
    }, []);

    // La miniatura actual siempre a la vista en la tira
    useEffect(() => {
        viewerRef.current?.querySelector('[aria-current="true"]')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }, [index]);

    const showPrevious = () => index > 0 && onIndexChange(index - 1);
    const showNext = () => index < photos.length - 1 && onIndexChange(index + 1);

    const handleKeyDown = (event) => {
        if (event.target.closest('button') && (event.key === 'Enter' || event.key === ' ')) return;
        if (event.key === 'Escape') onClose();
        else if (event.key === 'ArrowLeft') showPrevious();
        else if (event.key === 'ArrowRight') showNext();
        else if (event.key === '.') toggleFavorite(photo.id);
        else return;
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <div className="photos-viewer" ref={viewerRef} tabIndex={-1} onKeyDown={handleKeyDown}>
            <div className="photos-toolbar photos-viewer-toolbar" {...frame?.dragProps}>
                <button type="button" className="photos-back" onClick={onClose} title={t('gallery.back')}>
                    <ChevronLeftIcon size={14} />
                    <span>{backLabel}</span>
                </button>

                <div className="photos-heading photos-viewer-heading">
                    <h3 className="photos-title" id={frame?.titleId}>
                        <span className="visually-hidden">{frame?.title} — </span>{photo.name}
                    </h3>
                    <span className="photos-subtitle">{t('gallery.position', { index: index + 1, count: photos.length })}</span>
                </div>

                <div className="photos-viewer-actions">
                    <button
                        type="button"
                        className="photos-tool-btn photos-favorite-btn"
                        title={favoriteLabel}
                        aria-label={favoriteLabel}
                        aria-pressed={isFavorite}
                        onClick={() => toggleFavorite(photo.id)}
                    >
                        <HeartIcon filled={isFavorite} />
                    </button>
                    <button type="button" className="photos-tool-btn" title={t('gallery.previous')} aria-label={t('gallery.previous')} disabled={index === 0} onClick={showPrevious}>
                        <ChevronLeftIcon />
                    </button>
                    <button type="button" className="photos-tool-btn" title={t('gallery.next')} aria-label={t('gallery.next')} disabled={index === photos.length - 1} onClick={showNext}>
                        <ChevronRightIcon />
                    </button>
                </div>
            </div>

            <div className="photos-stage" onDoubleClick={onClose}>
                <img key={photo.id} src={photo.src} alt={photo.name} draggable="false" />
            </div>

            {photos.length > 1 && (
                <ul className="photos-filmstrip" aria-label={t('gallery.filmstrip')}>
                    {photos.map((item, itemIndex) => (
                        <li key={item.id}>
                            <button
                                type="button"
                                className="photos-filmstrip-item"
                                aria-current={itemIndex === index}
                                aria-label={item.name}
                                title={item.name}
                                onClick={() => onIndexChange(itemIndex)}
                            >
                                <img src={item.src} alt="" loading="lazy" draggable="false" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PhotosViewer;
