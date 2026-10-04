import { createContext, useContext } from 'react';

export const WindowManagerContext = createContext(null);

export function useWindowManager() {
    const context = useContext(WindowManagerContext);
    if (!context) {
        throw new Error('useWindowManager debe usarse dentro de <WindowManagerProvider>');
    }
    return context;
}
