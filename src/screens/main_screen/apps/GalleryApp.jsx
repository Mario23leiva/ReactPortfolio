import { useState } from 'react';
import './GalleryApp.css';
import { useI18n } from '../../../i18n/I18nContext.js';
import ImageViewer from '../ImageViewer.jsx';

// Carga todas las imágenes de src/assets/gallery: para añadir fotos basta con copiarlas en esa carpeta
const imageModules = import.meta.glob('../../../assets/gallery/*.{png,jpg,jpeg,webp,gif,avif}', {
    eager: true,
    import: 'default',
});

const images = Object.entries(imageModules)
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
    .map(([path, src]) => {
        const name = path.split('/').pop();
        return { src, name, alt: name };
    });

const GalleryApp = () => {
    const { t } = useI18n();
    const [selectedIndex, setSelectedIndex] = useState(null);

    if (images.length === 0) {
        return <div className="gallery-app gallery-empty">{t('gallery.empty')}</div>;
    }

    if (selectedIndex !== null) {
        return (
            <ImageViewer
                images={images}
                index={selectedIndex}
                onIndexChange={setSelectedIndex}
                onClose={() => setSelectedIndex(null)}
                closeLabel={t('gallery.allPhotos')}
            />
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
