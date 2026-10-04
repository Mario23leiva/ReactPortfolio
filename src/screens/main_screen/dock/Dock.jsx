import './Dock.css';
import DockItem from './DockItem.jsx';
import { APPS } from '../appsConfig.js';
import { useWindowManager } from '../windows/WindowManagerContext.js';

const Dock = () => {
    const { windows, dockClick } = useWindowManager();
    const openAppIds = new Set(windows.map((win) => win.id));

    return (
        <nav className="dock" aria-label="Dock">
            {APPS.map((app) => (
                <DockItem
                    key={app.id}
                    name={app.name}
                    icon={app.icon}
                    isOpen={openAppIds.has(app.id)}
                    onClick={() => dockClick({ id: app.id, title: app.name })}
                />
            ))}
        </nav>
    );
};

export default Dock;
