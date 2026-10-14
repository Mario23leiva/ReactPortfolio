import { useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, HeartIcon } from './PhotosIcons.jsx';
import { toggleFavorite } from './photosData.js';
import { useI18n } from '../../../../i18n/I18nContext.js';

// Distancias del gesto: a partir de cuánto se decide la dirección, se cambia de foto o se cierra
const AXIS_THRESHOLD = 8;
const SWIPE_DISTANCE = 60;
const CLOSE_DISTANCE = 110;

// Visor de Fotos del iPhone: deslizar a los lados cambia de foto, hacia abajo cierra
// y tocar la foto esconde o muestra las barras.
const PhotosPhoneViewer = ({ photos, index, onIndexChange, onClose, backLabel, favorites }) => {
    const { t } = useI18n();
    const viewerRef = useRef(null);
    const gestureRef = useRef(null);
    const [drag, setDrag] = useState({ x: 0, y: 0 });
    const [chrome, setChrome] = useState(true);
    const photo = photos[index];
    const isFavorite = favorites.has(photo.id);
    const favoriteLabel = isFavorite ? t('gallery.removeFavorite') : t('gallery.addFavorite');

    useEffect(() => {
        viewerRef.current?.focus({ preventScroll: true });
    }, []);

    const handlePointerDown = (event) => {
        gestureRef.current = { startX: event.clientX, startY: event.clientY, axis: null };
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event) => {
        const gesture = gestureRef.current;
        if (!gesture) return;
        const dx = event.clientX - gesture.startX;
        const dy = event.clientY - gesture.startY;
        if (!gesture.axis && Math.hypot(dx, dy) > AXIS_THRESHOLD) {
            gesture.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
        }
        if (gesture.axis === 'x') {
            // Resistencia al pasar de la primera o la última foto
            const atEdge = (dx > 0 && index === 0) || (dx < 0 && index === photos.length - 1);
            setDrag({ x: atEdge ? dx / 3 : dx, y: 0 });
        } else if (gesture.axis === 'y') {
            setDrag({ x: 0, y: Math.max(dy, 0) });
        }
    };

    const handlePointerUp = () => {
        const gesture = gestureRef.current;
        if (!gesture) return;
        gestureRef.current = null;
        if (!gesture.axis) {
            setChrome((visible) => !visible);
        } else if (gesture.axis === 'x') {
            if (drag.x < -SWIPE_DISTANCE && index < photos.length - 1) onIndexChange(index + 1);
            else if (drag.x > SWIPE_DISTANCE && index > 0) onIndexChange(index - 1);
        } else if (drag.y > CLOSE_DISTANCE) {
            onClose();
            return;
        }
        setDrag({ x: 0, y: 0 });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') onClose();
        else if (event.key === 'ArrowLeft' && index > 0) onIndexChange(index - 1);
        else if (event.key === 'ArrowRight' && index < photos.length - 1) onIndexChange(index + 1);
        else return;
        event.stopPropagation();
    };

    const dragging = drag.x !== 0 || drag.y !== 0;
    // Al arrastrar hacia abajo la foto se encoge y el fondo se desvanece
    const closeProgress = Math.min(drag.y / 300, 1);

    return (
        <div
            className={`photos-phone-viewer${chrome && !drag.y ? '' : ' immersive'}`}
            ref={viewerRef}
            tabIndex={-1}
            role="dialog"
            aria-label={photo.name}
            onKeyDown={handleKeyDown}
            style={{ '--viewer-bg-opacity': 1 - closeProgress }}
        >
            <div className="photos-phone-viewer-bg" />

            <div className="photos-phone-viewer-bar photos-phone-viewer-top">
                <button type="button" className="photos-phone-back" onClick={onClose} aria-label={t('gallery.back')}>
                    <ChevronLeftIcon size={20} />
                    <span>{backLabel}</span>
                </button>
                <div className="photos-phone-viewer-title">
                    <span>{photo.name}</span>
                    <span>{t('gallery.position', { index: index + 1, count: photos.length })}</span>
                </div>
                <span className="photos-phone-viewer-spacer" />
            </div>

            <div
                className="photos-phone-stage"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
            >
                <div
                    className={`photos-phone-track${dragging ? ' dragging' : ''}`}
                    style={{ transform: `translateX(calc(${-index * 100}% + ${drag.x}px))` }}
                >
                    {photos.map((item, itemIndex) => (
                        <div key={item.id} className="photos-phone-slide" aria-hidden={itemIndex !== index}>
                            <img
                                src={item.src}
                                alt={item.name}
                                draggable="false"
                                style={itemIndex === index && drag.y
                                    ? { transform: `translateY(${drag.y}px) scale(${1 - closeProgress * 0.35})` }
                                    : undefined}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="photos-phone-viewer-bar photos-phone-viewer-bottom">
                <button
                    type="button"
                    className="photos-phone-viewer-btn"
                    aria-label={favoriteLabel}
                    aria-pressed={isFavorite}
                    onClick={() => toggleFavorite(photo.id)}
                >
                    <HeartIcon size={24} filled={isFavorite} />
                </button>
            </div>
        </div>
    );
};

export default PhotosPhoneViewer;
