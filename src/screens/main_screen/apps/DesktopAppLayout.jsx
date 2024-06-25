import React from 'react';
import './DesktopAppLayout.css';

const README_APP = "README.txt";
const VIDEO_APP = "VIDEO.mp4";

const DesktopAppLayout = ({ AppId, AppName, AppComponent }) => {
    let desktopAppClass = 'desktop-app-layout';
    
    if (AppName === README_APP) {
        desktopAppClass += ' README active';
    } else if (AppName === VIDEO_APP) {
        desktopAppClass += ' VIDEO active';
    }

    const closeApp = () => {
        const app = document.getElementById(AppId);
        app.classList.toggle('active');
        if (AppName !== README_APP && AppName !== VIDEO_APP) {
            const pokeballApp = document.getElementById(`desktop-app-${AppId}`);
            pokeballApp.classList.remove('minimized');
        }
    };

    const minimizeApp = () => {
        const app = document.getElementById(AppId);
        app.classList.toggle('active');
        if (AppName !== README_APP && AppName !== VIDEO_APP) {
            const pokeballApp = document.getElementById(`desktop-app-${AppId}`);
            pokeballApp.classList.add('minimized');
        }
    };

    const maximizeApp = () => {
        const app = document.getElementById(AppId);
        app.classList.toggle('maximize');
    };

    const ajustarAncho = () => {
        const miDiv = document.getElementById(AppId);
        if (window.innerWidth <= 1000) {
            miDiv.classList.add('small-window');
        } else {
            miDiv.classList.remove('small-window');
        }
    };

    window.addEventListener('resize', ajustarAncho);

    const getAppContent = () => {
        if (AppName === VIDEO_APP) {
            return (
                <iframe
                    className="video-frame"
                    src={AppComponent}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            );
        }
        return AppComponent;
    };

    return (
        <div id={AppId} className={desktopAppClass}>
            <div className="top-bar" onDoubleClick={maximizeApp}>
                <div className="buttons">
                    <button type="button" id="closeBtn" title="Close" onClick={closeApp}></button>
                    <button type="button" id="minimizeBtn" title="Minimize" onClick={minimizeApp}></button>
                    <button type="button" id="maximizeBtn" title="Maximize/window" onClick={maximizeApp}></button>
                </div>
                <h3>{AppName}</h3>
            </div>
            <div className="app-container">
                {getAppContent()}
            </div>
        </div>
    );
};

export default DesktopAppLayout;
