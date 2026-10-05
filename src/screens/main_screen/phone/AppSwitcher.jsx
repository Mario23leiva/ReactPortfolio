import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useWindowManager } from '../windows/WindowManagerContext.js';
import { useI18n } from '../../../i18n/I18nContext.js';
import { getWindowIcon, getWindowTitle } from '../appsConfig.js';

// Deslizar una tarjeta hacia arriba más de esto la cierra
const CLOSE_DISTANCE = 90;
// Por debajo de esto el gesto cuenta como un toque
const TAP_DISTANCE = 8;

const SwitcherCard = ({ win, title, onOpen, onClose }) => {
    const { t } = useI18n();
    const [offset, setOffset] = useState(0);
    const startRef = useRef(null);

    const handlePointerDown = (event) => {
        startRef.current = event.clientY;
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event) => {
        if (startRef.current === null) return;
        setOffset(Math.min(event.clientY - startRef.current, 0));
    };

    const handlePointerUp = (event) => {
        if (startRef.current === null) return;
        const distance = startRef.current - event.clientY;
        startRef.current = null;
        setOffset(0);
        if (distance > CLOSE_DISTANCE) onClose();
        else if (Math.abs(distance) < TAP_DISTANCE) onOpen();
    };

    return (
        <li className="phone-switcher-item">
            <div className="phone-switcher-title">
                <img src={getWindowIcon(win)} alt="" />
                <span>{title}</span>
            </div>
            <button
                type="button"
                className="phone-switcher-card"
                style={{ transform: `translateY(${offset}px)`, opacity: 1 + offset / 300 }}
                aria-label={t('phone.openApp', { name: title })}
                title={t('phone.swipeHint')}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={() => { startRef.current = null; setOffset(0); }}
                onClick={(event) => event.detail === 0 && onOpen()}
            >
                <img src={getWindowIcon(win)} alt="" draggable="false" />
            </button>
            <button type="button" className="phone-switcher-close" aria-label={t('phone.closeApp', { name: title })} onClick={onClose}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </li>
    );
};

// Selector de apps abiertas, de la más reciente a la más antigua.
// onHome: tocar fuera de las tarjetas o Escape. onClose: se ha elegido una app.
const AppSwitcher = ({ onHome, onClose }) => {
    const { windows, openWindow, closeWindow } = useWindowManager();
    const { t } = useI18n();
    const ref = useRef(null);
    const sorted = [...windows].sort((a, b) => b.z - a.z);

    useEffect(() => {
        ref.current?.focus();
    }, []);

    return (
        <div
            ref={ref}
            className="phone-switcher"
            role="dialog"
            aria-label={t('phone.switcher')}
            tabIndex={-1}
            onClick={(event) => event.target === event.currentTarget && onHome()}
            onKeyDown={(event) => event.key === 'Escape' && onHome()}
        >
            {sorted.length === 0 ? (
                <p className="phone-switcher-empty">{t('phone.noApps')}</p>
            ) : (
                <ul className="phone-switcher-list" onClick={(event) => event.target === event.currentTarget && onHome()}>
                    {sorted.map((win) => (
                        <SwitcherCard
                            key={win.id}
                            win={win}
                            title={getWindowTitle(win, t)}
                            onOpen={() => { openWindow({ id: win.id }); onClose(); }}
                            onClose={() => closeWindow(win.id)}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AppSwitcher;
