import { useEffect, useId, useRef, useState } from 'react';
import './Finder.css';
import FinderSidebar from './FinderSidebar.jsx';
import FinderToolbar from './FinderToolbar.jsx';
import FinderIconView from './FinderIconView.jsx';
import FinderListView from './FinderListView.jsx';
import FinderPathBar from './FinderPathBar.jsx';
import { getProjectItems } from './finderItems.js';
import projects from '../../../../assets/json/projects.json';
import { useWindowFrame } from '../../windows/WindowFrameContext.js';
import { useWindowManager } from '../../windows/WindowManagerContext.js';
import { useI18n } from '../../../../i18n/I18nContext.js';

// Columnas que tiene ahora mismo la rejilla de la vista de iconos (para moverse con ↑/↓)
const countColumns = (container) => {
    const grid = container?.querySelector('.finder-icons');
    if (!grid) return 1;
    return getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length || 1;
};

// Finder de macOS Sequoia (versión de escritorio de la app Archivos).
// Los proyectos están en la barra lateral y el contenido muestra sus archivos.
const FinderApp = () => {
    const frame = useWindowFrame();
    const { openWindow, openInBrowser } = useWindowManager();
    const { t } = useI18n();
    const [history, setHistory] = useState({ stack: [projects[0].id], index: 0 });
    const [view, setView] = useState('icons');
    const [selectedId, setSelectedId] = useState(null);
    const [query, setQuery] = useState('');
    const contentRef = useRef(null);
    const baseId = useId();

    const projectId = history.stack[history.index];
    const project = projects.find((p) => p.id === projectId) ?? projects[0];
    const normalizedQuery = query.trim().toLowerCase();
    const items = getProjectItems(project, { t, openWindow, openInBrowser })
        .filter((item) => item.name.toLowerCase().includes(normalizedQuery));
    const selectedIndex = items.findIndex((item) => item.id === selectedId);
    const getOptionId = (itemId) => `${baseId}-${itemId}`;
    const activeOptionId = selectedIndex !== -1 ? getOptionId(selectedId) : undefined;

    // El elemento seleccionado siempre a la vista al moverse con el teclado
    useEffect(() => {
        if (activeOptionId) {
            document.getElementById(activeOptionId)?.scrollIntoView({ block: 'nearest' });
        }
    }, [activeOptionId, view]);

    const goTo = (id) => {
        if (id === projectId) return;
        setHistory(({ stack, index }) => ({ stack: [...stack.slice(0, index + 1), id], index: index + 1 }));
        setSelectedId(null);
        setQuery('');
    };

    const moveHistory = (step) => {
        const index = history.index + step;
        if (index < 0 || index >= history.stack.length) return;
        setHistory({ ...history, index });
        setSelectedId(null);
        setQuery('');
    };

    const openItem = (item) => item?.open?.();

    const handleContentKeyDown = (event) => {
        if (items.length === 0) return;

        if (event.key === 'Enter' || (event.metaKey && event.key === 'ArrowDown')) {
            event.preventDefault();
            openItem(items[selectedIndex]);
            return;
        }

        const columns = view === 'icons' ? countColumns(contentRef.current) : 1;
        const steps = {
            ArrowUp: -columns,
            ArrowDown: columns,
            ArrowLeft: view === 'icons' ? -1 : 0,
            ArrowRight: view === 'icons' ? 1 : 0,
            Home: -Infinity,
            End: Infinity,
        };
        const step = steps[event.key];
        if (step === undefined) return;

        event.preventDefault();
        // Sin selección, cualquier flecha selecciona el primero
        const next = selectedIndex === -1
            ? 0
            : Math.min(Math.max(selectedIndex + step, 0), items.length - 1);
        setSelectedId(items[next].id);
    };

    // ⌘[ y ⌘] como en el Finder
    const handleKeyDown = (event) => {
        if (!event.metaKey && !event.ctrlKey) return;
        if (event.key === '[') {
            event.preventDefault();
            moveHistory(-1);
        } else if (event.key === ']') {
            event.preventDefault();
            moveHistory(1);
        }
    };

    const ItemsView = view === 'icons' ? FinderIconView : FinderListView;

    return (
        <div className="finder" onKeyDown={handleKeyDown}>
            <FinderSidebar frame={frame} projects={projects} currentId={project.id} onSelect={goTo} />

            <div className="finder-main">
                <FinderToolbar
                    frame={frame}
                    title={project.title}
                    canGoBack={history.index > 0}
                    canGoForward={history.index < history.stack.length - 1}
                    onBack={() => moveHistory(-1)}
                    onForward={() => moveHistory(1)}
                    view={view}
                    onViewChange={setView}
                    query={query}
                    onQueryChange={setQuery}
                />

                <div
                    ref={contentRef}
                    className={`finder-content finder-content-${view}`}
                    role="listbox"
                    aria-label={project.title}
                    aria-activedescendant={activeOptionId}
                    tabIndex={0}
                    onKeyDown={handleContentKeyDown}
                    onClick={() => setSelectedId(null)}
                >
                    {items.length > 0 ? (
                        <ItemsView
                            items={items}
                            selectedId={selectedId}
                            getOptionId={getOptionId}
                            onSelect={setSelectedId}
                            onOpen={openItem}
                        />
                    ) : (
                        <p className="finder-empty">{t('files.noResults')}</p>
                    )}
                </div>

                <FinderPathBar projectTitle={project.title} count={items.length} />
            </div>
        </div>
    );
};

export default FinderApp;
