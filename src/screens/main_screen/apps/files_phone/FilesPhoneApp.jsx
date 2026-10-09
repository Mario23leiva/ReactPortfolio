import { useRef, useState } from 'react';
import './FilesPhone.css';
import FilesScreen from './FilesScreen.jsx';
import BrowseScreen from './BrowseScreen.jsx';
import FolderScreen from './FolderScreen.jsx';
import { GridIcon, ListIcon } from './FilesPhoneIcons.jsx';
import { getProjectItems } from '../projectItems.js';
import projects from '../../../../assets/json/projects.json';
import { useWindowManager } from '../../windows/WindowManagerContext.js';
import { useI18n } from '../../../../i18n/I18nContext.js';

// Colores de las etiquetas de iOS, en el orden en que aparecen
const TAG_COLORS = ['#ff3b30', '#ff9500', '#ffcc00', '#34c759', '#007aff', '#af52de', '#8e8e93'];

// Cada tecnología usada en algún proyecto es una etiqueta
const TAGS = [...new Set(projects.flatMap((project) => project.technologies))]
    .map((name, index) => ({ name, color: TAG_COLORS[index % TAG_COLORS.length] }));

// Gesto de volver: arrastrar desde el borde izquierdo
const EDGE_WIDTH = 24;
const BACK_DISTANCE = 80;

// App Archivos del iPhone: pila de pantallas Explorar → carpeta, como la app Files de iOS.
// Pantallas: { type: 'browse' } | { type: 'device' } | { type: 'tag', tag } | { type: 'folder', projectId }
const FilesPhoneApp = () => {
    const { openWindow, openInBrowser } = useWindowManager();
    const { t } = useI18n();
    const [stack, setStack] = useState([{ type: 'browse' }]);
    const [animation, setAnimation] = useState(null);
    const [view, setView] = useState('grid');
    const [swipeX, setSwipeX] = useState(0);
    const swipeRef = useRef(null);

    const push = (screen) => {
        setAnimation('push');
        setStack((current) => [...current, screen]);
    };

    const pop = () => {
        if (stack.length < 2) return;
        setAnimation('pop');
        setStack((current) => current.slice(0, -1));
    };

    const itemCount = (count) => (count === 1 ? t('files.itemCountOne') : t('files.itemCount', { count }));

    const projectItems = (project) => getProjectItems(project, { t, openWindow, openInBrowser });

    // Un proyecto como carpeta dentro de otra pantalla
    const projectEntry = (project) => ({
        id: project.id,
        name: project.title,
        subtitle: itemCount(projectItems(project).length),
        folder: true,
        open: () => push({ type: 'folder', projectId: project.id }),
    });

    const fileEntry = (item, subtitle = item.kind) => ({ ...item, subtitle });

    // Proyectos y archivos cuyo nombre contiene el texto buscado
    const search = (query) => [
        ...projects
            .filter((project) => project.title.toLowerCase().includes(query))
            .map(projectEntry),
        ...projects.flatMap((project) => projectItems(project)
            .filter((item) => item.name.toLowerCase().includes(query))
            .map((item) => ({ ...fileEntry(item, t('files.inProject', { name: project.title })), id: `${project.id}/${item.id}` }))),
    ];

    const getTitle = (screen) => {
        switch (screen.type) {
            case 'browse': return t('files.browse');
            case 'device': return t('files.onMyIphone');
            case 'tag': return screen.tag;
            default: return projects.find((project) => project.id === screen.projectId)?.title;
        }
    };

    const getEntries = (screen) => {
        switch (screen.type) {
            case 'device':
                return projects.map(projectEntry);
            case 'tag':
                return projects.filter((project) => project.technologies.includes(screen.tag)).map(projectEntry);
            default: {
                const project = projects.find((p) => p.id === screen.projectId);
                return project ? projectItems(project).map((item) => fileEntry(item)) : [];
            }
        }
    };

    const viewToggle = (
        <button
            type="button"
            className="files-nav-btn"
            aria-label={view === 'grid' ? t('files.viewList') : t('files.viewGrid')}
            title={view === 'grid' ? t('files.viewList') : t('files.viewGrid')}
            onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
        >
            {view === 'grid' ? <ListIcon /> : <GridIcon />}
        </button>
    );

    const handlePointerDown = (event) => {
        const left = event.currentTarget.getBoundingClientRect().left;
        if (stack.length > 1 && event.clientX - left < EDGE_WIDTH) {
            swipeRef.current = { startX: event.clientX };
            event.currentTarget.setPointerCapture(event.pointerId);
        }
    };

    const handlePointerMove = (event) => {
        if (swipeRef.current) {
            setSwipeX(Math.max(event.clientX - swipeRef.current.startX, 0));
        }
    };

    const handlePointerUp = () => {
        if (!swipeRef.current) return;
        swipeRef.current = null;
        if (swipeX > BACK_DISTANCE) pop();
        setSwipeX(0);
    };

    const top = stack.length - 1;

    return (
        <div
            className="files-phone"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={swipeX ? { '--files-swipe': `${swipeX}px` } : undefined}
        >
            {/* Las pantallas anteriores siguen montadas (ocultas) para conservar su scroll y su búsqueda */}
            {stack.map((screen, index) => (
                <FilesScreen
                    key={`${index}-${screen.type}-${screen.projectId ?? screen.tag ?? ''}`}
                    title={getTitle(screen)}
                    backLabel={index > 0 ? getTitle(stack[index - 1]) : null}
                    onBack={pop}
                    actions={screen.type === 'browse' ? null : viewToggle}
                    active={index === top}
                    animation={index === top ? animation : null}
                >
                    {screen.type === 'browse' ? (
                        <BrowseScreen
                            projects={projects}
                            tags={TAGS}
                            onOpenDevice={() => push({ type: 'device' })}
                            onOpenProject={(projectId) => push({ type: 'folder', projectId })}
                            onOpenTag={(tag) => push({ type: 'tag', tag })}
                            search={search}
                        />
                    ) : (
                        <FolderScreen entries={getEntries(screen)} view={view} />
                    )}
                </FilesScreen>
            ))}
        </div>
    );
};

export default FilesPhoneApp;
