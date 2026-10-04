import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import './GalleryApp.css';

// Carga todas las imágenes de src/assets/gallery: para añadir fotos basta con copiarlas en esa carpeta
const imageModules = import.meta.glob('../../../assets/gallery/*.{png,jpg,jpeg,webp,gif}', {
    eager: true,
    import: 'default',
});

const images = Object.entries(imageModules)
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
    .map(([path, src]) => ({ src, name: path.split('/').pop() }));

const GalleryApp = () => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const viewerRef = useRef(null);

    useEffect(() => {
        if (selectedIndex !== null) {
            viewerRef.current?.focus();
        }
    }, [selectedIndex]);

    if (images.length === 0) {
        return <div className="gallery-app gallery-empty">No pictures yet</div>;
    }

    const showPrevious = () => setSelectedIndex((index) => (index === 0 ? images.length - 1 : index - 1));
    const showNext = () => setSelectedIndex((index) => (index === images.length - 1 ? 0 : index + 1));
    const closeViewer = () => setSelectedIndex(null);

    const handleViewerKeyDown = (event) => {
        if (event.key === 'ArrowLeft') showPrevious();
        else if (event.key === 'ArrowRight') showNext();
        else if (event.key === 'Escape') closeViewer();
    };

    if (selectedIndex !== null) {
        const image = images[selectedIndex];
        return (
            <div className="gallery-app gallery-viewer" ref={viewerRef} tabIndex={-1} onKeyDown={handleViewerKeyDown}>
                <img src={image.src} alt={image.name} draggable="false" />
                <button type="button" className="gallery-viewer-btn close" title="All photos" onClick={closeViewer}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <button type="button" className="gallery-viewer-btn previous" title="Previous" onClick={showPrevious}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button type="button" className="gallery-viewer-btn next" title="Next" onClick={showNext}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
                <span className="gallery-viewer-counter">{selectedIndex + 1} / {images.length}</span>
            </div>
        );
    }

    return (
        <div className="gallery-app">
            <ul className="gallery-grid">
                {images.map((image, index) => (
                    <li key={image.name}>
                        <button type="button" className="gallery-thumb" title={image.name} onClick={() => setSelectedIndex(index)}>
                            <img src={image.src} alt={image.name} loading="lazy" draggable="false" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GalleryApp;
