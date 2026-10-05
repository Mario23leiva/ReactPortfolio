import { BROWSER_WINDOW, browserReducer, createBrowserData } from '../browser/browserState.js';

// Estado de las ventanas abiertas en el escritorio.
// Cada ventana: { id, title, icon, variant, data, minimized, maximized, z }
//  - variant: 'app' (apps del dock), 'browser' (navegador con las mini webs) o 'video'
//  - title / icon: solo para las ventanas que no son apps; se muestran en el dock
//  - z: orden de apilado, la ventana con mayor z está en primer plano

export const initialWindowState = {
    windows: [],
    zCounter: 0,
};

const findWindow = (state, id) => state.windows.find((win) => win.id === id);

const updateWindow = (state, id, changes) => ({
    ...state,
    windows: state.windows.map((win) => (win.id === id ? { ...win, ...changes } : win)),
});

// Ventana visible (no minimizada) que está en primer plano
const getTopWindow = (state) =>
    state.windows
        .filter((win) => !win.minimized)
        .reduce((top, win) => (!top || win.z > top.z ? win : top), null);

const bringToFront = (state, id) => {
    const z = state.zCounter + 1;
    return { ...updateWindow(state, id, { minimized: false, z }), zCounter: z };
};

const openWindow = (state, window) => {
    if (findWindow(state, window.id)) {
        return bringToFront(state, window.id);
    }

    const z = state.zCounter + 1;
    const newWindow = {
        variant: 'app',
        data: null,
        ...window,
        minimized: false,
        maximized: false,
        z,
    };
    return { windows: [...state.windows, newWindow], zCounter: z };
};

export function windowReducer(state, action) {
    switch (action.type) {
        case 'OPEN':
            return openWindow(state, action.window);

        case 'FOCUS': {
            const win = findWindow(state, action.id);
            if (!win || getTopWindow(state)?.id === win.id) {
                return state;
            }
            return bringToFront(state, action.id);
        }

        case 'CLOSE':
            return { ...state, windows: state.windows.filter((win) => win.id !== action.id) };

        case 'MINIMIZE':
            return updateWindow(state, action.id, { minimized: true });

        case 'TOGGLE_MAXIMIZE': {
            const win = findWindow(state, action.id);
            return win ? updateWindow(state, action.id, { maximized: !win.maximized }) : state;
        }

        // Clic en un icono del dock:
        //  - cerrada → se abre
        //  - minimizada o tapada por otra ventana → pasa a primer plano
        //  - ya en primer plano → se minimiza
        case 'DOCK_CLICK': {
            const win = findWindow(state, action.window.id);
            if (!win) {
                return openWindow(state, action.window);
            }
            if (getTopWindow(state)?.id === win.id) {
                return updateWindow(state, win.id, { minimized: true });
            }
            return bringToFront(state, win.id);
        }

        // Abrir una URL en el navegador: abre la ventana si hace falta y la trae al frente
        case 'BROWSER_OPEN': {
            const win = findWindow(state, BROWSER_WINDOW.id);
            if (!win) {
                return openWindow(state, { ...BROWSER_WINDOW, data: createBrowserData(action.url) });
            }
            const data = browserReducer(win.data, { type: 'OPEN_URL', url: action.url });
            return bringToFront(updateWindow(state, win.id, { data }), win.id);
        }

        // Acciones dentro del navegador (pestañas, historial). Sin pestañas, la ventana se cierra.
        case 'BROWSER': {
            const win = findWindow(state, BROWSER_WINDOW.id);
            if (!win) return state;
            const data = browserReducer(win.data, action.action);
            if (data.tabs.length === 0) {
                return { ...state, windows: state.windows.filter((item) => item.id !== win.id) };
            }
            return updateWindow(state, win.id, { data });
        }

        default:
            return state;
    }
}
