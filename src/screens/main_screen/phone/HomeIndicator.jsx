import { useRef } from 'react';
import { useI18n } from '../../../i18n/I18nContext.js';

// A partir de esta distancia, deslizar hacia arriba abre las apps abiertas en vez de ir al inicio
const SWITCHER_DISTANCE = 140;

// Barra inferior de iOS: tocar o deslizar un poco → inicio; deslizar más → apps abiertas.
// onDrag informa de la distancia mientras se arrastra para animar la app.
const HomeIndicator = ({ light, onHome, onSwitcher, onDrag }) => {
    const { t } = useI18n();
    const startRef = useRef(null);

    const handlePointerDown = (event) => {
        startRef.current = event.clientY;
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event) => {
        if (startRef.current === null) return;
        onDrag(Math.max(startRef.current - event.clientY, 0));
    };

    const handlePointerUp = (event) => {
        if (startRef.current === null) return;
        const distance = startRef.current - event.clientY;
        startRef.current = null;
        onDrag(0);
        if (distance > SWITCHER_DISTANCE) onSwitcher();
        else onHome();
    };

    const handlePointerCancel = () => {
        startRef.current = null;
        onDrag(0);
    };

    return (
        <div className={`phone-home-indicator${light ? ' light' : ''}`}>
            <button
                type="button"
                className="phone-home-bar"
                aria-label={t('phone.goHome')}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerCancel}
                // Con teclado no hay puntero: Enter / espacio llevan al inicio
                onClick={(event) => event.detail === 0 && onHome()}
            >
                <span aria-hidden="true"></span>
            </button>
            <button type="button" className="visually-hidden" onClick={onSwitcher}>{t('phone.openSwitcher')}</button>
        </div>
    );
};

export default HomeIndicator;
