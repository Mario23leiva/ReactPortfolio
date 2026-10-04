// Todas las imágenes de src/assets: se precargan en la pantalla de bloqueo
// para que el escritorio aparezca con todo ya cargado
const assetModules = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp,gif,svg}', {
    eager: true,
    import: 'default',
});

const ASSET_URLS = Object.values(assetModules);

// Límite de seguridad para no dejar al usuario bloqueado con una conexión muy lenta
const MAX_WAIT_MS = 20000;

// Mantiene las imágenes referenciadas para que el navegador no las descarte de memoria
const preloadedImages = [];

const preloadImage = (src) => new Promise((resolve) => {
    const img = new Image();
    // Una imagen que falla no debe impedir la entrada
    img.onload = resolve;
    img.onerror = resolve;
    img.src = src;
    preloadedImages.push(img);
});

export function preloadAssets() {
    const timeout = new Promise((resolve) => setTimeout(resolve, MAX_WAIT_MS));
    return Promise.race([Promise.all(ASSET_URLS.map(preloadImage)), timeout]);
}
