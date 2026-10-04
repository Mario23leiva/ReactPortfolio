import './MainScreen.css'
import Dock from './dock/Dock.jsx';
import WindowsLayer from './windows/WindowsLayer.jsx';
import WindowManagerProvider from './windows/WindowManagerProvider.jsx';

function MainScreen() {
    return (
        <WindowManagerProvider>
            <div className="main-screen">
                <div className="main-container">
                    <WindowsLayer />
                </div>
                <div className="menu">
                    <Dock />
                </div>
            </div>
        </WindowManagerProvider>
    );
}

export default MainScreen;
