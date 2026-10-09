import { useEffect, useRef } from 'react';
import './Contacts.css';
import ContactCard from './ContactCard.jsx';
import { ChevronLeftIcon } from './ContactsIcons.jsx';
import contact from '../../../../assets/json/contact.json';
import profileImg from '../../../../assets/profile-picture.webp';
import { useI18n } from '../../../../i18n/I18nContext.js';

// App Contactos del iPhone: Póster de contacto de iOS (foto a pantalla completa).
// Al desplazar, el póster se recoge y la barra de navegación muestra el nombre en pequeño.
const ContactsPhoneApp = () => {
    const { t, localize } = useI18n();
    const scrollRef = useRef(null);
    const posterRef = useRef(null);
    const frameRef = useRef(0);
    const location = localize(contact.location);

    // --poster-progress: 0 con el póster entero a la vista, 1 cuando ya ha pasado por arriba.
    // Se escribe directamente en el DOM para no volver a renderizar en cada evento de scroll.
    const handleScroll = () => {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = requestAnimationFrame(() => {
            const container = scrollRef.current;
            const poster = posterRef.current;
            if (!container || !poster) return;
            const progress = Math.min(Math.max(container.scrollTop / poster.offsetHeight, 0), 1);
            container.style.setProperty('--poster-progress', progress.toFixed(3));
        });
    };

    useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

    return (
        <div className="contacts-phone">
            <div className="contacts-phone-scroll" ref={scrollRef} onScroll={handleScroll}>
                <header className="contacts-phone-nav">
                    {/* Decorativo: solo hay una ficha */}
                    <span className="contacts-phone-back" aria-hidden="true">
                        <ChevronLeftIcon />
                        {t('contacts.back')}
                    </span>
                    <span className="contacts-phone-compact" aria-hidden="true">
                        <img src={profileImg} alt="" draggable="false" />
                        {contact.firstName}
                    </span>
                </header>

                <section className="contacts-poster" ref={posterRef}>
                    <img src={profileImg} alt="" className="contacts-poster-photo" draggable="false" />
                    <div className="contacts-poster-text">
                        <h2 className="contacts-poster-name">
                            <span className="contacts-poster-first">{contact.firstName}</span>
                            <span className="contacts-poster-last">{contact.lastName}</span>
                        </h2>
                        <p className="contacts-poster-role">{t('profile.role')}</p>
                        {location && <p className="contacts-poster-location">{location}</p>}
                    </div>
                </section>

                <ContactCard poster />
            </div>
        </div>
    );
};

export default ContactsPhoneApp;
