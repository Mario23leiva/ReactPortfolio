import { useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon } from './FilesPhoneIcons.jsx';
import { useI18n } from '../../../../i18n/I18nContext.js';

// Una pantalla de la pila de navegación: barra superior de iOS, título grande y contenido.
// Al hacer scroll el título grande se esconde y aparece el pequeño en la barra.
// backLabel: título de la pantalla anterior (sin él no hay botón de volver)
// actions: botones de la derecha de la barra
const FilesScreen = ({ title, backLabel, onBack, actions, active, animation, children }) => {
    const { t } = useI18n();
    const scrollRef = useRef(null);
    const titleRef = useRef(null);
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setCollapsed(!entry.isIntersecting),
            { root: scrollRef.current },
        );
        observer.observe(titleRef.current);
        return () => observer.disconnect();
    }, []);

    // Al llegar a una pantalla el foco pasa a su título, como hace VoiceOver en iOS
    useEffect(() => {
        if (active) {
            titleRef.current?.focus({ preventScroll: true });
        }
    }, [active]);

    return (
        <div className={`files-screen${animation ? ` files-screen-${animation}` : ''}`} hidden={!active}>
            <div className={`files-navbar${collapsed ? ' collapsed' : ''}`}>
                <div className="files-navbar-side">
                    {backLabel && (
                        <button type="button" className="files-back" onClick={onBack} aria-label={t('files.back')}>
                            <ChevronLeftIcon />
                            <span>{backLabel}</span>
                        </button>
                    )}
                </div>
                <span className="files-navbar-title" aria-hidden="true">{title}</span>
                <div className="files-navbar-side files-navbar-actions">{actions}</div>
            </div>

            <div className="files-scroll" ref={scrollRef}>
                <h1 className="files-large-title" ref={titleRef} tabIndex={-1}>{title}</h1>
                {children}
            </div>
        </div>
    );
};

export default FilesScreen;
