import ProfileApp from './apps/ProfileApp.jsx';
import FilesApp from './apps/FilesApp.jsx';
import GalleryApp from './apps/GalleryApp.jsx';

import ProfileIcon from '../../assets/iconos/contact-icon.png';
import FilesIcon from '../../assets/iconos/files.png';
import GalleryIcon from '../../assets/iconos/pictures.png';

// Registro de las apps del dock. Para añadir una app nueva basta con añadirla aquí.
export const APPS = [
    { id: 'PROFILE', name: 'Profile', icon: ProfileIcon, component: ProfileApp },
    { id: 'FILES', name: 'Files', icon: FilesIcon, component: FilesApp },
    { id: 'GALLERY', name: 'Gallery', icon: GalleryIcon, component: GalleryApp },
];

export const getApp = (id) => APPS.find((app) => app.id === id);
