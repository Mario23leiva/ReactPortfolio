import { useState, useEffect } from 'react';
import MacLockScreen from './MacLockScreen.jsx';
import PhoneLockScreen from './PhoneLockScreen.jsx';
import { preloadAssets } from '../../utils/preloadAssets.js';
import { PHONE_QUERY, useMediaQuery } from '../../hooks/useMediaQuery.js';

// Pantalla de bloqueo: precarga los recursos y muestra el login del Mac o el del iPhone.
// onEnter monta la pantalla principal debajo; onExited quita el bloqueo al acabar su animación.
function BlockedScreen({ onEnter, onExited }) {
    const isPhone = useMediaQuery(PHONE_QUERY);
    const [assetsLoaded, setAssetsLoaded] = useState(false);
    const [assetsProgress, setAssetsProgress] = useState(0);

    // La precarga empieza nada más mostrarse la pantalla de bloqueo
    useEffect(() => {
        let cancelled = false;
        preloadAssets((fraction) => {
            if (!cancelled) setAssetsProgress(fraction);
        }).then(() => {
            if (!cancelled) setAssetsLoaded(true);
        });
        return () => {
            cancelled = true;
        };
    }, []);

    const LockScreen = isPhone ? PhoneLockScreen : MacLockScreen;

    return (
        <LockScreen
            assetsLoaded={assetsLoaded}
            progress={assetsLoaded ? 1 : assetsProgress}
            onEnter={onEnter}
            onExited={onExited}
        />
    );
}

export default BlockedScreen;
