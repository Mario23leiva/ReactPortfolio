import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import './ImageViewer.css';
import { useI18n } from '../../i18n/I18nContext.js';

// Visor de imágenes a tamaño completo: flechas (botones y teclado), Esc y clic en el fondo para cerrar.
// images: [{ src, alt }]. Lo usan la app Galería y la galería de las mini webs.
const ImageViewer = ({ images, index, onIndexChange, onClose, closeLabel, className = '' }) => {
    const { t } = useI18n();
    const viewerRef = useRef(null);
    const hasSeveral = images.length > 1;

    // Al abrir recibe el foco para los atajos; al cerrar lo devuelve a quien lo tenía
    useEffect(() => {
        const previousFocus = document.activeElement;
        viewerRef.current?.focus();
        return () => previousFocus?.focus?.();
    }, []);

    const showPrevious = () => onIndexChange(index === 0 ? images.length - 1 : index - 1);
    const showNext = () => onIndexChange(index === images.length - 1 ? 0 : index + 1);

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') onClose();
        else if (hasSeveral && event.key === 'ArrowLeft') showPrevious();
        else if (hasSeveral && event.key === 'ArrowRight') showNext();
        else return;
        event.stopPropagation();
    };

    const image = images[index];

    return (
        <div
            className={`image-viewer ${className}`}
            ref={viewerRef}
            tabIndex={-1}
            role="dialog"
            aria-label={image.alt}
            onKeyDown={handleKeyDown}
            onClick={(event) => event.target === event.currentTarget && onClose()}
        >
            <img src={image.src} alt={image.alt} draggable="false" />
            <button type="button" className="image-viewer-btn close" title={closeLabel} aria-label={closeLabel} onClick={onClose}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
            {hasSeveral && (
                <>
                    <button type="button" className="image-viewer-btn previous" title={t('gallery.previous')} aria-label={t('gallery.previous')} onClick={showPrevious}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button type="button" className="image-viewer-btn next" title={t('gallery.next')} aria-label={t('gallery.next')} onClick={showNext}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                    <span className="image-viewer-counter">{index + 1} / {images.length}</span>
                </>
            )}
        </div>
    );
};

export default ImageViewer;
