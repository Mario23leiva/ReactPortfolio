import ProfileApp from './apps/ProfileApp.jsx';
import FilesApp from './apps/FilesApp.jsx';
import GalleryApp from './apps/GalleryApp.jsx';

import ProfileIcon from '../../assets/iconos/contact-icon.webp';
import FilesIcon from '../../assets/iconos/files.webp';
import GalleryIcon from '../../assets/iconos/pictures.webp';
import NoFunIcon from '../../assets/iconos/no-fun.svg';
import { getActiveTab, getCurrentUrl, getPageTitle } from './browser/browserState.js';

// Registro de las apps del dock. Para añadir una app nueva basta con añadirla aquí.
// nameKey es la clave de traducción del nombre (ver src/i18n).
export const APPS = [
    { id: 'PROFILE', nameKey: 'apps.profile', icon: ProfileIcon, component: ProfileApp },
    { id: 'FILES', nameKey: 'apps.files', icon: FilesIcon, component: FilesApp },
    { id: 'GALLERY', nameKey: 'apps.gallery', icon: GalleryIcon, component: GalleryApp },
];

// Enlaces externos del dock: se muestran al final, separados de las apps
export const DOCK_LINKS = [
    { id: 'SERIOUS_PORTFOLIO', nameKey: 'dock.seriousPortfolio', icon: NoFunIcon, url: 'https://mario23leiva.github.io' },
];

export const getApp = (id) => APPS.find((app) => app.id === id);

// Título de una ventana: las apps usan su nombre traducido; el navegador, la página activa;
// el resto, el título con el que se abrieron
export const getWindowTitle = (win, t) => {
    if (win.variant === 'browser') {
        return `${t('browser.name')} - ${getPageTitle(getCurrentUrl(getActiveTab(win.data)), t)}`;
    }
    const app = win.variant === 'app' && getApp(win.id);
    return app ? t(app.nameKey) : win.title;
};
