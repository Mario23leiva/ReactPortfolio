import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import '../main_screen/phone/Phone.css';
import './PhoneLockScreen.css';
import StatusBar from '../main_screen/phone/StatusBar.jsx';
import { useI18n } from '../../i18n/I18nContext.js';
import { formatDate, formatTime, useClock } from '../../hooks/useClock.js';

// Autologin: tras una pausa se pasa a la pantalla de código y el PIN se teclea solo
const AUTOLOGIN_DELAY_MS = 1500;
const AUTO_PIN = '232323';
const PIN_LENGTH = AUTO_PIN.length;
const FIRST_KEY_MS = 600;
const KEY_MIN_MS = 180;
const KEY_MAX_MS = 260;
const KEY_HIGHLIGHT_MS = 150;
const BEFORE_UNLOCK_MS = 200;
// Deslizamiento de la pantalla de bloqueo hacia arriba (con el retraso del candado), ver CSS
const UNLOCK_MS = 650;
// Distancia mínima para considerar que se ha deslizado hacia arriba en el bloqueo
const SWIPE_DISTANCE = 30;

const KEYS = [
    ['1', ''], ['2', 'ABC'], ['3', 'DEF'],
    ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'],
    ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'],
    ['0', ''],
];

const FlashlightIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 2h10v4l-2.5 4v11a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V10L7 6Z" />
        <circle cx="12" cy="14" r="1.4" fill="rgba(0,0,0,0.45)" />
    </svg>
);

// Pantalla de bloqueo de iOS: hora grande → código de 6 cifras → desbloqueo deslizando hacia arriba.
// Ver BlockedScreen para assetsLoaded / onEnter / onExited
function PhoneLockScreen({ assetsLoaded, onEnter, onExited }) {
    const { t, language } = useI18n();
    const now = useClock();
    const [phase, setPhase] = useState('lock');
    const [digits, setDigits] = useState(0);
    const [pressedKey, setPressedKey] = useState(null);
    // Si el usuario toca una tecla, el autotecleo se detiene
    const [manual, setManual] = useState(false);
    const swipeStartRef = useRef(null);

    const showPasscode = () => setPhase((current) => (current === 'lock' ? 'passcode' : current));

    const pressKey = (key) => {
        setPressedKey(key);
        setDigits((current) => Math.min(current + 1, PIN_LENGTH));
    };

    const handleKeyClick = (key) => {
        setManual(true);
        pressKey(key);
    };

    // Borrar un dígito o, sin dígitos, volver a la hora (y el autologin vuelve a empezar)
    const handleDeleteOrCancel = () => {
        if (digits > 0) {
            setManual(true);
            setDigits(digits - 1);
        } else {
            setManual(false);
            setPhase('lock');
        }
    };

    // Tras una pausa en la hora se pasa solo a la pantalla de código
    useEffect(() => {
        if (phase !== 'lock') return;
        const timeout = setTimeout(() => setPhase('passcode'), AUTOLOGIN_DELAY_MS);
        return () => clearTimeout(timeout);
    }, [phase]);

    // Tecleo automático del PIN, una tecla cada poco tiempo
    useEffect(() => {
        if (phase !== 'passcode' || manual || digits >= PIN_LENGTH) return;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const delay = digits === 0 ? FIRST_KEY_MS : KEY_MIN_MS + Math.random() * (KEY_MAX_MS - KEY_MIN_MS);
        const timeout = setTimeout(() => {
            if (reduceMotion) {
                setDigits(PIN_LENGTH);
            } else {
                setPressedKey(AUTO_PIN[digits]);
                setDigits(digits + 1);
            }
        }, delay);
        return () => clearTimeout(timeout);
    }, [phase, manual, digits]);

    // La tecla pulsada se ilumina un instante, como en iOS
    useEffect(() => {
        if (pressedKey === null) return;
        const timeout = setTimeout(() => setPressedKey(null), KEY_HIGHLIGHT_MS);
        return () => clearTimeout(timeout);
    }, [pressedKey, digits]);

    // Con el código completo y todo cargado, se desbloquea
    useEffect(() => {
        if (phase !== 'passcode' || digits < PIN_LENGTH || !assetsLoaded) return;
        const timeout = setTimeout(() => setPhase('unlocking'), BEFORE_UNLOCK_MS);
        return () => clearTimeout(timeout);
    }, [phase, digits, assetsLoaded]);

    // La pantalla de inicio se monta debajo y el bloqueo sube dejándola ver
    useEffect(() => {
        if (phase !== 'unlocking') return;
        onEnter();
        const timeout = setTimeout(onExited, UNLOCK_MS);
        return () => clearTimeout(timeout);
    }, [phase, onEnter, onExited]);

    // Teclado físico: Enter / Espacio en la hora, cifras y retroceso en el código
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (phase === 'lock' && (event.code === 'Space' || event.key === 'Enter')) {
                event.preventDefault();
                setPhase('passcode');
            } else if (phase === 'passcode' && /^[0-9]$/.test(event.key) && digits < PIN_LENGTH) {
                setManual(true);
                setPressedKey(event.key);
                setDigits(digits + 1);
            } else if (phase === 'passcode' && event.key === 'Backspace' && digits > 0) {
                setManual(true);
                setDigits(digits - 1);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [phase, digits]);

    const handlePointerDown = (event) => {
        swipeStartRef.current = event.clientY;
    };

    const handlePointerUp = (event) => {
        if (swipeStartRef.current !== null && swipeStartRef.current - event.clientY > SWIPE_DISTANCE) {
            showPasscode();
        }
        swipeStartRef.current = null;
    };

    return (
        <div className={`phone-lock is-${phase}`}>
            <div className="phone-lock-wallpaper" aria-hidden="true" />
            <StatusBar showTime={false} />

            <FontAwesomeIcon icon={phase === 'unlocking' ? faLockOpen : faLock} className="phone-lock-padlock" />

            {/* Pantalla de bloqueo: tocar o deslizar hacia arriba pasa al código */}
            <div
                className="phone-lock-cover"
                aria-hidden={phase !== 'lock'}
                onClick={showPasscode}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
            >
                <div className="phone-lock-clock">
                    <p className="phone-lock-date">{formatDate(now, language)}</p>
                    <time className="phone-lock-time" dateTime={now.toISOString()}>{formatTime(now, language)}</time>
                </div>
                <span className="phone-lock-action left" aria-hidden="true"><FlashlightIcon /></span>
                <span className="phone-lock-action right" aria-hidden="true"><FontAwesomeIcon icon={faCamera} /></span>
                <span className="phone-lock-home-bar" aria-hidden="true" />
            </div>

            {phase !== 'lock' && (
                <div className="phone-lock-passcode">
                    <h1 className="phone-lock-title">{t('lockScreen.enterPasscode')}</h1>
                    <div className="phone-lock-dots" role="img" aria-label={t('lockScreen.digitsEntered', { count: digits })}>
                        {Array.from({ length: PIN_LENGTH }, (_, index) => (
                            <span key={index} className={index < digits ? 'filled' : ''} />
                        ))}
                    </div>
                    <div className="phone-lock-keypad">
                        {KEYS.map(([number, letters]) => (
                            <button
                                key={number}
                                type="button"
                                className={`phone-lock-key${pressedKey === number ? ' pressed' : ''}`}
                                aria-label={letters ? `${number} ${letters}` : number}
                                onClick={() => handleKeyClick(number)}
                                disabled={phase !== 'passcode'}
                            >
                                <span className="phone-lock-key-number">{number}</span>
                                {letters && <span className="phone-lock-key-letters">{letters}</span>}
                            </button>
                        ))}
                    </div>
                    <button
                        type="button"
                        className="phone-lock-cancel"
                        onClick={handleDeleteOrCancel}
                        disabled={phase !== 'passcode'}
                    >
                        {t(digits > 0 ? 'lockScreen.delete' : 'lockScreen.cancel')}
                    </button>
                </div>
            )}
        </div>
    );
}

export default PhoneLockScreen;
