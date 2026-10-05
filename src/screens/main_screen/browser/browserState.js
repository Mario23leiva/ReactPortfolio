import projects from '../../../assets/json/projects.json';
import ChromeIcon from '../../../assets/iconos/chrome.webp';

// Navegador simulado: una única ventana con pestañas, cada una con su propio historial.
// Estado (en win.data): { tabs: [{ id, history: [url], index }], activeTabId, nextTabId }

export const BROWSER_WINDOW = { id: 'BROWSER', variant: 'browser', icon: ChromeIcon };

export const NEW_TAB_URL = 'chrome://newtab';
const PROJECTS_PATH = 'file:///Users/mario/Projects/';

// Las mini webs son el index.html de cada proyecto, como si se abriera desde el disco
export const getProjectUrl = (project) => `${PROJECTS_PATH}${project.id}/index.html`;

// Qué página corresponde a una URL
export const resolvePage = (url) => {
    if (url === NEW_TAB_URL) {
        return { type: 'newtab' };
    }
    const project = projects.find((item) => getProjectUrl(item) === url);
    return project ? { type: 'project', project } : { type: 'notfound' };
};

export const getPageTitle = (url, t) => {
    const page = resolvePage(url);
    if (page.type === 'newtab') return t('browser.newTab');
    if (page.type === 'project') return page.project.title;
    return url;
};

// Texto escrito en la barra de direcciones o en el buscador → URL.
// Acepta una URL conocida o el nombre (o parte del nombre) de un proyecto.
export const resolveAddressInput = (input) => {
    const text = input.trim();
    if (!text) return null;
    if (resolvePage(text).type !== 'notfound') return text;

    const query = text.toLowerCase();
    const project = projects.find((item) => item.title.toLowerCase().includes(query) || item.id.includes(query));
    return project ? getProjectUrl(project) : text;
};

export const getCurrentUrl = (tab) => tab.history[tab.index];

export const getActiveTab = (data) => data.tabs.find((tab) => tab.id === data.activeTabId);

const createTab = (id, url) => ({ id, history: [url], index: 0 });

export const createBrowserData = (url) => ({ tabs: [createTab(1, url)], activeTabId: 1, nextTabId: 2 });

const addTab = (data, url) => ({
    tabs: [...data.tabs, createTab(data.nextTabId, url)],
    activeTabId: data.nextTabId,
    nextTabId: data.nextTabId + 1,
});

const updateActiveTab = (data, update) => ({
    ...data,
    tabs: data.tabs.map((tab) => (tab.id === data.activeTabId ? update(tab) : tab)),
});

export function browserReducer(data, action) {
    switch (action.type) {
        // Abrir una URL desde fuera del navegador: si ya hay una pestaña con ella, se reutiliza
        case 'OPEN_URL': {
            const existing = data.tabs.find((tab) => getCurrentUrl(tab) === action.url);
            return existing ? { ...data, activeTabId: existing.id } : addTab(data, action.url);
        }

        case 'NEW_TAB':
            return addTab(data, NEW_TAB_URL);

        case 'SELECT_TAB':
            return { ...data, activeTabId: action.tabId };

        // Al cerrar la pestaña activa pasa a estar activa la de su derecha (o la de su izquierda)
        case 'CLOSE_TAB': {
            const index = data.tabs.findIndex((tab) => tab.id === action.tabId);
            if (index === -1) return data;
            const tabs = data.tabs.filter((tab) => tab.id !== action.tabId);
            const activeTabId = data.activeTabId === action.tabId
                ? (tabs[index] ?? tabs[index - 1])?.id ?? null
                : data.activeTabId;
            return { ...data, tabs, activeTabId };
        }

        // Navegar descarta el historial "adelante", como en un navegador real
        case 'NAVIGATE':
            return updateActiveTab(data, (tab) => (
                getCurrentUrl(tab) === action.url
                    ? tab
                    : { ...tab, history: [...tab.history.slice(0, tab.index + 1), action.url], index: tab.index + 1 }
            ));

        case 'BACK':
            return updateActiveTab(data, (tab) => ({ ...tab, index: Math.max(tab.index - 1, 0) }));

        case 'FORWARD':
            return updateActiveTab(data, (tab) => ({ ...tab, index: Math.min(tab.index + 1, tab.history.length - 1) }));

        default:
            return data;
    }
}
