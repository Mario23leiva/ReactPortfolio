import { useSyncExternalStore } from 'react';

// Carga todas las imágenes de src/assets/gallery: para añadir fotos basta con copiarlas en esa carpeta
const imageModules = import.meta.glob('../../../../assets/gallery/*.{png,jpg,jpeg,webp,gif,avif}', {
    eager: true,
    import: 'default',
});

// { id, src, name }: el id y el nombre son el nombre del archivo
export const PHOTOS = Object.entries(imageModules)
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
    .map(([path, src]) => {
        const name = path.split('/').pop();
        return { id: name, src, name };
    });

// Secciones de la app: la biblioteca y la colección de favoritas
export const SECTIONS = ['library', 'favorites'];

export const getSectionPhotos = (section, favorites) => (
    section === 'favorites' ? PHOTOS.filter((photo) => favorites.has(photo.id)) : PHOTOS
);

// ---------- Favoritas ----------
// Se guardan en el navegador y se comparten entre la versión del Mac y la del iPhone
const STORAGE_KEY = 'photos-favorites';

const readFavorites = () => {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return new Set(Array.isArray(saved) ? saved.filter((id) => PHOTOS.some((photo) => photo.id === id)) : []);
    } catch {
        return new Set();
    }
};

let favorites = readFavorites();
const listeners = new Set();

const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};

export const toggleFavorite = (id) => {
    favorites = new Set(favorites);
    if (favorites.has(id)) favorites.delete(id);
    else favorites.add(id);
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
    } catch {
        // Sin almacenamiento (modo privado...): las favoritas duran lo que dure la visita
    }
    listeners.forEach((listener) => listener());
};

// Set con los ids de las fotos favoritas
export const useFavorites = () => useSyncExternalStore(subscribe, () => favorites);

// "1 foto" / "3 fotos"
export const photoCount = (count, t) => (
    count === 1 ? t('gallery.photoCountOne') : t('gallery.photoCount', { count })
);
