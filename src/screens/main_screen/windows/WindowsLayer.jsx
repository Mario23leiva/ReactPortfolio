import Window from './Window.jsx';
import { useWindowManager } from './WindowManagerContext.js';
import WindowContent from './WindowContent.jsx';
import BrowserTabs from '../browser/BrowserTabs.jsx';

// Las ventanas mantienen su orden en el array para no desmontarse al cambiar
// de primer plano; el apilado se controla con z-index.
const WindowsLayer = () => {
    const { windows } = useWindowManager();

    return windows.map((win) => (
        <Window
            key={win.id}
            win={win}
            topBarContent={win.variant === 'browser' ? <BrowserTabs data={win.data} /> : null}
        >
            <WindowContent win={win} />
        </Window>
    ));
};

export default WindowsLayer;
