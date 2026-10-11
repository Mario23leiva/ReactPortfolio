import { ASSET_URLS } from './assets.js';

// Todas las imágenes de src/assets se precargan en la pantalla de bloqueo
// para que el escritorio aparezca con todo ya cargado

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

// onProgress (opcional) recibe la fracción de imágenes ya cargadas, de 0 a 1
export function preloadAssets(onProgress) {
    let loaded = 0;
    const track = (src) => preloadImage(src).then(() => {
        loaded += 1;
        onProgress?.(loaded / ASSET_URLS.length);
    });
    const timeout = new Promise((resolve) => setTimeout(resolve, MAX_WAIT_MS));
    return Promise.race([Promise.all(ASSET_URLS.map(track)), timeout]);
}
