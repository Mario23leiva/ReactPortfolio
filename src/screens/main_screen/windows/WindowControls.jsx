import { useWindowManager } from './WindowManagerContext.js';
import { useI18n } from '../../../i18n/I18nContext.js';

// Botones de cerrar, minimizar y maximizar (semáforo de macOS)
const WindowControls = ({ win, title }) => {
    const { closeWindow, minimizeWindow, toggleMaximize } = useWindowManager();
    const { t } = useI18n();

    return (
        <div className="buttons">
            <button type="button" className="window-btn close" title={t('window.close')} aria-label={t('window.closeNamed', { name: title })} onClick={() => closeWindow(win.id)}></button>
            <button type="button" className="window-btn minimize" title={t('window.minimize')} aria-label={t('window.minimizeNamed', { name: title })} onClick={() => minimizeWindow(win.id)}></button>
            <button type="button" className="window-btn maximize" title={t('window.maximize')} aria-label={t('window.maximizeNamed', { name: title })} onClick={() => toggleMaximize(win.id)}></button>
        </div>
    );
};

export default WindowControls;
