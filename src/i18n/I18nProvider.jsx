import { useCallback, useEffect, useMemo } from 'react';
import { I18nContext } from './I18nContext.js';
import es from './es.json';
import en from './en.json';

// Para añadir un idioma: crear su JSON con las mismas claves y registrarlo aquí
const LANGUAGES = { es, en };
const DEFAULT_LANGUAGE = 'en';

// Primer idioma preferido del navegador que esté traducido; si no hay ninguno, inglés
const detectLanguage = () => {
    const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];
    const match = preferred
        .map((code) => code?.slice(0, 2).toLowerCase())
        .find((code) => LANGUAGES[code]);
    return match ?? DEFAULT_LANGUAGE;
};

// Busca una clave con puntos ("dock.open") en el diccionario
const lookup = (dictionary, key) =>
    key.split('.').reduce((node, part) => node?.[part], dictionary);

const language = detectLanguage();

const I18nProvider = ({ children }) => {
    useEffect(() => {
        document.documentElement.lang = language;
    }, []);

    // t('dock.open', { name: 'Files' }) → "Files (open)"
    // Si falta la traducción se usa el inglés y, si tampoco existe, la propia clave
    const t = useCallback((key, params) => {
        const text = lookup(LANGUAGES[language], key) ?? lookup(LANGUAGES[DEFAULT_LANGUAGE], key) ?? key;
        if (!params) return text;
        return text.replace(/\{(\w+)\}/g, (match, name) => params[name] ?? match);
    }, []);

    // Textos de los JSON de contenido: { "es": "...", "en": "..." } → texto en el idioma actual
    // Los valores que no son objetos (nombres propios, URLs...) se devuelven tal cual
    const localize = useCallback((value) => {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            return value[language] ?? value[DEFAULT_LANGUAGE];
        }
        return value;
    }, []);

    const value = useMemo(() => ({ language, t, localize }), [t, localize]);

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export default I18nProvider;
