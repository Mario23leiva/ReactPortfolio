import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './BlockedScreen.css';
import FotoPerfil from '../../assets/foto_epica_redonda.webp';
import { preloadAssets } from '../../utils/preloadAssets.js';
import { useI18n } from '../../i18n/I18nContext.js';

// Tiempo mínimo de la pantalla de carga para que la animación no parpadee
const MIN_LOADING_MS = 2000;

function BlockedScreen({ onEnter }) {
    const { t } = useI18n();
    const [bluredScreen, setBluredScreen] = useState(false);
    const [startY, setStartY] = useState(null);
    const [blurValue, setBlurValue] = useState(0);
    const [assetsLoaded, setAssetsLoaded] = useState(false);
    const [minLoadingDone, setMinLoadingDone] = useState(false);

    // La precarga empieza nada más mostrarse la pantalla de bloqueo
    useEffect(() => {
        let cancelled = false;
        preloadAssets().then(() => {
            if (!cancelled) setAssetsLoaded(true);
        });
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.code === 'Space' || event.key === 'Enter') && !bluredScreen) {
                setBlurValue(23)
                setBluredScreen(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [bluredScreen]);

    // Al desbloquear, la pantalla de carga dura al menos MIN_LOADING_MS
    useEffect(() => {
        if (!bluredScreen) return;
        const timeout = setTimeout(() => setMinLoadingDone(true), MIN_LOADING_MS);
        return () => clearTimeout(timeout);
    }, [bluredScreen]);

    // Solo se entra al escritorio cuando todo está cargado
    useEffect(() => {
        if (minLoadingDone && assetsLoaded) {
            onEnter();
        }
    }, [minLoadingDone, assetsLoaded, onEnter]);

    const handleTouchStart = (event) => {
        if (!bluredScreen) {
            setBlurValue(0);
            setStartY(event.touches[0].clientY);
        }
    };

    const handleTouchMove = (event) => {
        if (!bluredScreen) {
            const deltaY = startY - event.touches[0].clientY;
            if (deltaY > 0) {
                setBlurValue(deltaY / 10);
            }

            if (startY && event.touches[0].clientY < startY - 200) {
                setBluredScreen(true);
                setStartY(null);
            }
        }
    };

    const handleMouseDown = (event) => {
        if (!bluredScreen) {
            setStartY(event.clientY);
            event.preventDefault();
        }
    };

    const handleMouseUp = () => {
        if (!bluredScreen) {
            setStartY(null);
            setBlurValue(0);
        }
    };

    const handleMouseMove = (event) => {
        if (!bluredScreen) {
            const deltaY = startY - event.clientY;
            if (deltaY > 0) {
                setBlurValue(deltaY / 10);
            }

            if (startY && event.clientY < startY - 200) {
                setBluredScreen(true);
                setStartY(null);
            }
        }
    };

    return (
        <div className="blocked-screen"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            <div className='blocked-screen-background-image' style={{ filter: `blur(${blurValue}px)` }}>
                <h2 className='bounce-animation'>{t('lockScreen.unlock')}</h2>
            </div>

            {bluredScreen &&
                <div className='blocked-screen-login' role="status">
                    <img src={FotoPerfil} alt="" />
                    <h2>Mario Leiva Torres</h2>
                    <h1>{t('lockScreen.loading')}  <FontAwesomeIcon id="spinner" icon={faSpinner} /></h1>
                </div>
            }
        </div>
    );
}

export default BlockedScreen;
