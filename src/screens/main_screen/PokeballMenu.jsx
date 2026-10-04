import { useState } from 'react';
import './PokeballMenu.css';
import DesktopApp from './DesktopApp';
import { APPS } from './appsConfig.js';

import FilesIcon from '../../assets/iconos/files.png';
import AboutMe from '../../assets/perfil.png';
import PicturesIcon from '../../assets/iconos/pictures.png';
import PokeballTop from '../../assets/pokeball-top.png';
import PokeballBottom from '../../assets/pokeball-bottom.png';

import fondo1 from '../../assets/fondos/pantalla.png';
import fondo4 from '../../assets/fondos/win_xp.png';
import fondo3 from '../../assets/fondos/el_edit.png';
import fondo2 from '../../assets/fondos/otra.jpg';


const PokeballMenu = () => {

    const imgArray = [fondo1, fondo2, fondo3, fondo4];
    const [backgroundIndex, setBackgroundIndex] = useState(0);

    const handleClick = () => {
        const pokeball = document.getElementById('pokeball');
        pokeball.classList.add('pokeball-active');
        pokeball.classList.remove('pokeball-hover');
    };

    const openApp = (AppId) => {
        const app = document.getElementById(AppId);
        const activeApps = document.querySelectorAll('.desktop-app-layout.active');

        if (activeApps.length > 0) {
            activeApps.forEach((activeApp, index) => {
                if(activeApp.id === AppId) {
                    activeApp.style.zIndex = 999;
                } else{
                    activeApp.style.zIndex = index;
                }
            });
        }

        app.classList.toggle('active');
    };


    const changeBackground = () => {
        setBackgroundIndex((prevIndex) => (prevIndex + 1) % imgArray.length);
        const mainScreen = document.querySelector('.main-screen');
        mainScreen.style.backgroundImage = `url(${imgArray[backgroundIndex]})`;
    };

    return (
        <div className="pokeball-menu" >
            <div id="pokeball" className="pokeball pokeball-hover">
                <img className='pokeball-img' src={PokeballTop} alt="" onClick={handleClick} />
                <div className='pokeball-apps-container'>
                    <DesktopApp AppId={APPS.PROFILE.id} AppImg={AboutMe} AppName={APPS.PROFILE.name} onClickApp={openApp} />
                    <DesktopApp AppId={APPS.PICTURES.id} AppImg={PicturesIcon} AppName={APPS.PICTURES.name} onClickApp={changeBackground} />
                    <DesktopApp AppId={APPS.FILES.id} AppImg={FilesIcon} AppName={APPS.FILES.name} onClickApp={openApp} />
                </div>
                <img className='pokeball-img' src={PokeballBottom} alt="" onClick={handleClick} />
            </div>
        </div>
    );
};

export default PokeballMenu;