import { useEffect, useState } from 'react';
import './MacLockScreen.css';
import FotoPerfil from '../../assets/foto_epica_redonda.webp';
import { useI18n } from '../../i18n/I18nContext.js';
import { formatDate, formatTime, useClock } from '../../hooks/useClock.js';

// Autologin: tras una pausa se "escribe" la contraseña sola y se pulsa Enter
const AUTOLOGIN_DELAY_MS = 1500;
const PASSWORD_LENGTH = 8;
const KEY_MIN_MS = 90;
const KEY_MAX_MS = 160;
const BEFORE_SUBMIT_MS = 250;
const SUBMIT_MS = 300;
const PROGRESS_TICK_MS = 100;
// Tiempo mínimo de la pantalla de carga para que la animación no parpadee
const MIN_LOADING_MS = 2000;
// Fundido de la pantalla de carga al escritorio
const EXIT_MS = 400;

const WifiIcon = () => (
    <svg viewBox="0 0 20 14" aria-hidden="true">
        <path d="M10 13.5a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2Z" />
        <path d="M5.6 8.6a6.3 6.3 0 0 1 8.8 0l-1.3 1.3a4.5 4.5 0 0 0-6.2 0Z" />
        <path d="M2.9 5.9a10.1 10.1 0 0 1 14.2 0l-1.3 1.3a8.3 8.3 0 0 0-11.6 0Z" />
        <path d="M.2 3.2a13.9 13.9 0 0 1 19.6 0l-1.3 1.3a12.1 12.1 0 0 0-17 0Z" />
    </svg>
);

const BatteryIcon = () => (
    <svg viewBox="0 0 27 13" aria-hidden="true">
        <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" opacity="0.5" />
        <rect x="2" y="2" width="20" height="9" rx="2" />
        <path d="M25 4.5v4a2 2 0 0 0 0-4Z" opacity="0.5" />
    </svg>
);

const AppleLogo = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
);

const ArrowIcon = () => (
    <svg viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 10h7.5M10.5 6.5 14 10l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Pantalla de inicio de sesión de macOS Sequoia/Tahoe: reloj grande arriba, usuario abajo
// y, al entrar, la pantalla de arranque con la manzana y la barra de progreso.
// progress: fracción de recursos precargados (0 a 1). Ver BlockedScreen para onEnter / onExited
function MacLockScreen({ assetsLoaded, progress, onEnter, onExited }) {
    const { t, language } = useI18n();
    const now = useClock();
    const [typed, setTyped] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const [exiting, setExiting] = useState(false);

    const submit = () => {
        setTyped(PASSWORD_LENGTH);
        setSubmitting(true);
    };

    // Tecleo automático de la contraseña, una tecla cada poco tiempo
    useEffect(() => {
        if (submitting) return;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let timeout;
        if (typed === 0) {
            timeout = setTimeout(() => setTyped(reduceMotion ? PASSWORD_LENGTH : 1), AUTOLOGIN_DELAY_MS);
        } else if (typed < PASSWORD_LENGTH) {
            const delay = KEY_MIN_MS + Math.random() * (KEY_MAX_MS - KEY_MIN_MS);
            timeout = setTimeout(() => setTyped(typed + 1), delay);
        } else {
            timeout = setTimeout(() => setSubmitting(true), BEFORE_SUBMIT_MS);
        }
        return () => clearTimeout(timeout);
    }, [typed, submitting]);

    // El botón se ve pulsado un instante antes de entrar
    useEffect(() => {
        if (!submitting || loading) return;
        const timeout = setTimeout(() => setLoading(true), SUBMIT_MS);
        return () => clearTimeout(timeout);
    }, [submitting, loading]);

    // Enter o Espacio entran sin esperar al autologin
    useEffect(() => {
        if (submitting) return;
        const handleKeyDown = (event) => {
            if (event.code === 'Space' || event.key === 'Enter') {
                event.preventDefault();
                setTyped(PASSWORD_LENGTH);
                setSubmitting(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [submitting]);

    // Progreso por tiempo: la barra no pasa del 100 % antes de MIN_LOADING_MS
    useEffect(() => {
        if (!loading) return;
        const start = Date.now();
        const interval = setInterval(() => {
            const fraction = Math.min((Date.now() - start) / MIN_LOADING_MS, 1);
            setElapsed(fraction);
            if (fraction === 1) clearInterval(interval);
        }, PROGRESS_TICK_MS);
        return () => clearInterval(interval);
    }, [loading]);

    // Solo se entra al escritorio cuando todo está cargado y la barra ha llegado al final
    useEffect(() => {
        if (elapsed === 1 && assetsLoaded) setExiting(true);
    }, [elapsed, assetsLoaded]);

    // El escritorio se monta debajo y la pantalla de carga se desvanece encima
    useEffect(() => {
        if (!exiting) return;
        onEnter();
        const timeout = setTimeout(onExited, EXIT_MS);
        return () => clearTimeout(timeout);
    }, [exiting, onEnter, onExited]);

    const percent = Math.round(Math.min(progress, elapsed) * 100);

    return (
        <div
            className={`mac-lock${submitting ? ' is-submitting' : ''}${loading ? ' cursor-wait' : ''}${exiting ? ' is-exiting' : ''}`}
        >
            <div className="mac-lock-wallpaper" aria-hidden="true" />

            <div className="mac-lock-status">
                <span>{language.toUpperCase()}</span>
                <WifiIcon />
                <BatteryIcon />
            </div>

            <div className="mac-lock-clock">
                <p className="mac-lock-date">{formatDate(now, language)}</p>
                <time className="mac-lock-time" dateTime={now.toISOString()}>{formatTime(now, language)}</time>
            </div>

            <form
                className="mac-lock-user"
                onSubmit={(event) => {
                    event.preventDefault();
                    submit();
                }}
            >
                <img src={FotoPerfil} alt="" />
                <h1 className="mac-lock-name">Mario Leiva Torres</h1>
                <div className="mac-lock-field">
                    <input
                        type="password"
                        readOnly
                        value={'•'.repeat(typed)}
                        placeholder={t('lockScreen.passwordPlaceholder')}
                        aria-label={t('lockScreen.passwordLabel')}
                    />
                    <button type="submit" className={submitting ? 'is-pressed' : ''} aria-label={t('lockScreen.login')}>
                        <ArrowIcon />
                    </button>
                </div>
            </form>

            {loading && (
                <div className="mac-lock-boot">
                    <AppleLogo />
                    <div
                        className="mac-lock-progress"
                        role="progressbar"
                        aria-label={t('lockScreen.loading')}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={percent}
                    >
                        <div style={{ width: `${percent}%` }} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default MacLockScreen;
