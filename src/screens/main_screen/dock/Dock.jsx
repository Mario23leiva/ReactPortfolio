import './Dock.css';
import DockItem from './DockItem.jsx';
import { APPS, DOCK_LINKS, getWindowTitle } from '../appsConfig.js';
import { useWindowManager } from '../windows/WindowManagerContext.js';
import { useI18n } from '../../../i18n/I18nContext.js';
import { useTheme } from '../../../theme/ThemeContext.js';
import { THEME_ICONS } from '../../../theme/themeIcons.js';

// Orden del dock, como en macOS: apps | ventanas de documentos abiertas | apariencia y enlaces
const Dock = () => {
    const { windows, dockClick } = useWindowManager();
    const { t } = useI18n();
    const { preference, cycleTheme } = useTheme();
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
                    name={getWindowTitle(win, t)}
                    icon={win.icon}
                    isOpen
                    onClick={() => dockClick({ id: win.id })}
                />
            ))}

            <span className="dock-separator" aria-hidden="true"></span>
            <DockItem
                name={t('theme.label', { mode: t(`theme.${preference}`) })}
                icon={THEME_ICONS[preference]}
                onClick={cycleTheme}
            />
            {DOCK_LINKS.map((link) => (
                <DockItem key={link.id} name={t(link.nameKey)} icon={link.icon} href={link.url} />
            ))}
        </nav>
    );
};

export default Dock;
