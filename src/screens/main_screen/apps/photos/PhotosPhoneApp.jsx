import { useEffect, useRef, useState } from 'react';
import './PhotosPhone.css';
import PhotosPhoneViewer from './PhotosPhoneViewer.jsx';
import { HeartIcon } from './PhotosIcons.jsx';
import { SECTIONS, getSectionPhotos, photoCount, useFavorites } from './photosData.js';
import { useI18n } from '../../../../i18n/I18nContext.js';

// App Fotos del iPhone: título grande que se recoge al desplazar, cuadrícula de 3 columnas
// sin huecos, selector flotante Biblioteca / Favoritas y visor a pantalla completa con gestos.
const PhotosPhoneApp = () => {
    const { t } = useI18n();
    const favorites = useFavorites();
    const [section, setSection] = useState('library');
    const [viewer, setViewer] = useState(null);
    const [collapsed, setCollapsed] = useState(false);
    const scrollRef = useRef(null);
    const titleRef = useRef(null);

    const photos = getSectionPhotos(section, favorites);
    const title = t(`gallery.${section}`);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setCollapsed(!entry.isIntersecting),
            { root: scrollRef.current },
        );
        observer.observe(titleRef.current);
        return () => observer.disconnect();
    }, []);

    const changeSection = (id) => {
        setSection(id);
        scrollRef.current?.scrollTo({ top: 0 });
    };

    return (
        <div className="photos-phone">
            {/* La cuadrícula sigue montada bajo el visor para conservar el scroll */}
            <div className="photos-phone-library" hidden={Boolean(viewer)}>
                <div className={`photos-phone-navbar${collapsed ? ' collapsed' : ''}`} aria-hidden="true">
                    <span>{title}</span>
                </div>

                <div className="photos-phone-scroll" ref={scrollRef}>
                    <header className="photos-phone-header">
                        <h1 ref={titleRef} tabIndex={-1}>{title}</h1>
                        <p>{photoCount(photos.length, t)}</p>
                    </header>

                    {photos.length > 0 ? (
                        <ul className="photos-phone-grid">
                            {photos.map((photo, index) => (
                                <li key={photo.id}>
                                    <button type="button" className="photos-phone-thumb" aria-label={photo.name} onClick={() => setViewer({ photos, index })}>
                                        <img src={photo.src} alt="" loading="lazy" draggable="false" />
                                        {favorites.has(photo.id) && (
                                            <span className="photos-phone-thumb-favorite"><HeartIcon size={13} filled /></span>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="photos-phone-empty">
                            {section === 'favorites' && <HeartIcon size={44} />}
                            <p className="photos-phone-empty-title">{section === 'favorites' ? t('gallery.noFavorites') : t('gallery.empty')}</p>
                            {section === 'favorites' && <p>{t('gallery.noFavoritesHintPhone')}</p>}
                        </div>
                    )}
                </div>

                <div className="photos-phone-tabs" role="tablist" aria-label={t('gallery.sections')}>
                    {SECTIONS.map((id) => (
                        <button
                            key={id}
                            type="button"
                            role="tab"
                            aria-selected={section === id}
                            onClick={() => changeSection(id)}
                        >
                            {t(`gallery.${id}`)}
                        </button>
                    ))}
                </div>
            </div>

            {viewer && (
                <PhotosPhoneViewer
                    photos={viewer.photos}
                    index={viewer.index}
                    onIndexChange={(index) => setViewer({ ...viewer, index })}
                    onClose={() => setViewer(null)}
                    backLabel={title}
                    favorites={favorites}
                />
            )}
        </div>
    );
};

export default PhotosPhoneApp;
