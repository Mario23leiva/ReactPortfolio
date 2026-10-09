import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { ThemeContext } from './ThemeContext.js';
import { DARK_QUERY, useMediaQuery } from '../hooks/useMediaQuery.js';

// Preferencia guardada: 'system' sigue al sistema operativo; 'light' y 'dark' lo fuerzan.
// index.html lee la misma clave antes de pintar para no mostrar un destello del otro tema.
const STORAGE_KEY = 'theme';
const PREFERENCES = ['system', 'light', 'dark'];

// Color de la barra del navegador en móvil para cada tema
const THEME_COLORS = { light: '#d9c5a7', dark: '#1c1c1e' };

const readPreference = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return PREFERENCES.includes(saved) ? saved : 'system';
    } catch {
        return 'system';
    }
};

const savePreference = (preference) => {
    try {
        if (preference === 'system') localStorage.removeItem(STORAGE_KEY);
        else localStorage.setItem(STORAGE_KEY, preference);
    } catch {
        // Sin almacenamiento (modo privado...): el tema dura lo que dure la visita
    }
};

const ThemeProvider = ({ children }) => {
    const [preference, setPreference] = useState(readPreference);
    const systemDark = useMediaQuery(DARK_QUERY);
    const theme = preference === 'system' ? (systemDark ? 'dark' : 'light') : preference;

    useLayoutEffect(() => {
        const root = document.documentElement;
        root.dataset.theme = theme;
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
    }, [theme]);

    // Automático → Claro → Oscuro → Automático, con un fundido si el navegador lo permite
    const cycleTheme = useCallback(() => {
        const change = () => {
            setPreference((current) => {
                const next = PREFERENCES[(PREFERENCES.indexOf(current) + 1) % PREFERENCES.length];
                savePreference(next);
                return next;
            });
        };
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (document.startViewTransition && !reduceMotion) {
            document.startViewTransition(() => flushSync(change));
        } else {
            change();
        }
    }, []);

    const value = useMemo(() => ({ preference, theme, cycleTheme }), [preference, theme, cycleTheme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
