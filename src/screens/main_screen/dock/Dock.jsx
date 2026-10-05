import './Dock.css';
import DockItem from './DockItem.jsx';
import { APPS, DOCK_LINKS } from '../appsConfig.js';
import { useWindowManager } from '../windows/WindowManagerContext.js';
import { useI18n } from '../../../i18n/I18nContext.js';

// Orden del dock, como en macOS: apps | ventanas de documentos abiertas | enlaces
const Dock = () => {
    const { windows, dockClick } = useWindowManager();
    const { t } = useI18n();
    const openAppIds = new Set(windows.map((win) => win.id));
    const documentWindows = windows.filter((win) => win.variant !== 'app');

    return (
        <nav className="dock" aria-label={t('dock.label')}>
            {APPS.map((app) => (
                <DockItem
                    key={app.id}
                    name={t(app.nameKey)}
                    icon={app.icon}
                    isOpen={openAppIds.has(app.id)}
                    onClick={() => dockClick({ id: app.id })}
                />
            ))}

            {documentWindows.length > 0 && <span className="dock-separator" aria-hidden="true"></span>}
            {documentWindows.map((win) => (
                <DockItem
                    key={win.id}
                    name={win.title}
                    icon={win.icon}
                    isOpen
                    onClick={() => dockClick({ id: win.id })}
                />
            ))}

            <span className="dock-separator" aria-hidden="true"></span>
            {DOCK_LINKS.map((link) => (
                <DockItem key={link.id} name={t(link.nameKey)} icon={link.icon} href={link.url} />
            ))}
        </nav>
    );
};

export default Dock;
