import IMG_FILE from '../../../../assets/iconos/archivo.webp';
import IMG_CHROME from '../../../../assets/iconos/chrome.webp';
import IMG_GITHUB from '../../../../assets/iconos/github.webp';
import { TECHNOLOGY_ICONS } from '../../technologyIcons.js';
import { getProjectUrl } from '../../browser/browserState.js';

// "Archivos" que se ven dentro de la carpeta de un proyecto en el Finder.
// Cada uno: { id, name, icon, kind, title, open? }. Los que no tienen open no hacen nada al abrirlos.
// actions: { t, openWindow, openInBrowser } (del gestor de ventanas e i18n)
export function getProjectItems(project, { t, openWindow, openInBrowser }) {
    const items = [
        {
            // La mini web del proyecto se abre en el navegador simulado
            id: 'index.html',
            name: 'index.html',
            icon: IMG_CHROME,
            kind: t('files.kindHtml'),
            title: t('files.openWebsite'),
            open: () => openInBrowser(getProjectUrl(project)),
        },
    ];

    // videoUrl debe ser una URL embed de YouTube: https://www.youtube.com/embed/<id>
    if (project.videoUrl) {
        items.push({
            id: 'VIDEO.mp4',
            name: 'VIDEO.mp4',
            icon: IMG_FILE,
            kind: t('files.kindVideo'),
            title: t('files.videoResume'),
            open: () => openWindow({
                id: `video-project-${project.id}`,
                title: `${project.title} - VIDEO.mp4`,
                icon: IMG_FILE,
                variant: 'video',
                data: { url: project.videoUrl },
            }),
        });
    }

    if (project.repoUrl) {
        items.push({
            id: 'github',
            name: 'GitHub',
            icon: IMG_GITHUB,
            kind: t('files.kindLink'),
            title: t('files.goToRepository'),
            open: () => window.open(project.repoUrl, '_blank', 'noopener,noreferrer'),
        });
    }

    project.technologies.forEach((technology) => {
        items.push({
            id: `tech-${technology}`,
            name: technology,
            icon: TECHNOLOGY_ICONS[technology],
            kind: t('files.kindTechnology'),
            title: technology,
        });
    });

    return items;
}
