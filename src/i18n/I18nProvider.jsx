import { useCallback, useEffect, useMemo, useState } from 'react';
import { I18nContext } from './I18nContext.js';
import es from './es.json';
import en from './en.json';

// Para añadir un idioma: crear su JSON con las mismas claves y registrarlo aquí
const LANGUAGES = { es, en };
const DEFAULT_LANGUAGE = 'en';
const STORAGE_KEY = 'language';

// Idioma guardado por el usuario o, si no hay, el del navegador
const detectLanguage = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (LANGUAGES[saved]) return saved;
    } catch {
        // localStorage puede no estar disponible (modo privado)
    }
    const browserLanguage = navigator.language?.slice(0, 2);
    return LANGUAGES[browserLanguage] ? browserLanguage : DEFAULT_LANGUAGE;
};

// Busca una clave con puntos ("dock.open") en el diccionario
const lookup = (dictionary, key) =>
    key.split('.').reduce((node, part) => node?.[part], dictionary);

const I18nProvider = ({ children }) => {
    const [language, setLanguageState] = useState(detectLanguage);

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    const setLanguage = useCallback((next) => {
        if (!LANGUAGES[next]) return;
        setLanguageState(next);
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            // Sin persistencia: el idioma se mantiene solo en esta visita
        }
    }, []);

    // t('dock.open', { name: 'Files' }) → "Files (open)"
    // Si falta la traducción se usa el inglés y, si tampoco existe, la propia clave
    const t = useCallback((key, params) => {
        const text = lookup(LANGUAGES[language], key) ?? lookup(LANGUAGES[DEFAULT_LANGUAGE], key) ?? key;
        if (!params) return text;
        return text.replace(/\{(\w+)\}/g, (match, name) => params[name] ?? match);
    }, [language]);

    const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export default I18nProvider;
