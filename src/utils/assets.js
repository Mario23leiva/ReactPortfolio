// Todas las imágenes de src/assets, indexadas por su ruta dentro de esa carpeta
// (p. ej. "gallery/otra.webp"). Así los JSON de contenido pueden referenciar imágenes.
const assetModules = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp,gif,svg,avif}', {
    eager: true,
    import: 'default',
});

const ASSETS = Object.fromEntries(
    Object.entries(assetModules).map(([path, url]) => [path.replace('../assets/', ''), url]),
);

export const ASSET_URLS = Object.values(ASSETS);

export const getAsset = (path) => ASSETS[path];
