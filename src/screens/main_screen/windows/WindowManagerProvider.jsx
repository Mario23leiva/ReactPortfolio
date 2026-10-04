import { useMemo, useReducer } from 'react';
import { WindowManagerContext } from './WindowManagerContext.js';
import { initialWindowState, windowReducer } from './windowReducer.js';

const WindowManagerProvider = ({ children }) => {
    const [state, dispatch] = useReducer(windowReducer, initialWindowState);

    const actions = useMemo(() => ({
        openWindow: (window) => dispatch({ type: 'OPEN', window }),
        focusWindow: (id) => dispatch({ type: 'FOCUS', id }),
        closeWindow: (id) => dispatch({ type: 'CLOSE', id }),
        minimizeWindow: (id) => dispatch({ type: 'MINIMIZE', id }),
        toggleMaximize: (id) => dispatch({ type: 'TOGGLE_MAXIMIZE', id }),
        dockClick: (window) => dispatch({ type: 'DOCK_CLICK', window }),
    }), []);

    const value = useMemo(() => ({ windows: state.windows, ...actions }), [state.windows, actions]);

    return (
        <WindowManagerContext.Provider value={value}>
            {children}
        </WindowManagerContext.Provider>
    );
};

export default WindowManagerProvider;
