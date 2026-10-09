import { useId, useRef, useState } from 'react';
import './Contacts.css';
import ContactCard, { CONTACT_SECTION } from './ContactCard.jsx';
import { PersonIcon, SectionIcon } from './ContactsIcons.jsx';
import profileData from '../../../../assets/json/my-profile.json';
import WindowControls from '../../windows/WindowControls.jsx';
import { useWindowFrame } from '../../windows/WindowFrameContext.js';
import { useI18n } from '../../../../i18n/I18nContext.js';

// Margen por encima de una sección para darla por "actual" al desplazarse
const SPY_OFFSET = 24;

// App Contactos de macOS Sequoia (versión de escritorio del Perfil).
// La barra lateral lleva a cada sección de la ficha y se actualiza al desplazarse.
const ContactsApp = () => {
    const frame = useWindowFrame();
    const { t, localize } = useI18n();
    const [activeId, setActiveId] = useState(CONTACT_SECTION);
    const scrollRef = useRef(null);
    const scrollLockRef = useRef(null);
    const baseId = useId();
    const getSectionId = (id) => `${baseId}-${id}`;

    const sections = [
        { id: CONTACT_SECTION, title: t('contacts.contact'), icon: <PersonIcon /> },
        ...profileData.map((item) => ({ id: item.id, title: localize(item.title), icon: <SectionIcon /> })),
    ];

    const goToSection = (id) => {
        setActiveId(id);
        // Mientras dura el desplazamiento animado, el scroll no cambia la sección marcada
        clearTimeout(scrollLockRef.current);
        scrollLockRef.current = setTimeout(() => { scrollLockRef.current = null; }, 800);
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.getElementById(getSectionId(id))?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    };

    // La sección actual es la última cuyo inicio ya ha pasado por arriba (o la última, al llegar al final)
    const handleScroll = () => {
        const container = scrollRef.current;
        if (!container || scrollLockRef.current) return;
        const { scrollTop, clientHeight, scrollHeight } = container;
        let current = sections[0].id;
        if (scrollTop + clientHeight >= scrollHeight - 2) {
            current = sections[sections.length - 1].id;
        } else {
            for (const section of sections) {
                const element = document.getElementById(getSectionId(section.id));
                if (element && element.offsetTop - SPY_OFFSET <= scrollTop) current = section.id;
            }
        }
        setActiveId(current);
    };

    return (
        <div className="contacts">
            <nav className="contacts-sidebar" aria-label={t('contacts.sections')}>
                <div className="contacts-sidebar-titlebar" {...frame?.dragProps}>
                    {frame && <WindowControls win={frame.win} title={frame.title} />}
                </div>

                <h2 className="contacts-sidebar-heading">{t('contacts.card')}</h2>
                <ul className="contacts-sidebar-list">
                    {sections.map((section) => (
                        <li key={section.id}>
                            <button
                                type="button"
                                className="contacts-sidebar-item"
                                aria-current={section.id === activeId ? 'location' : undefined}
                                onClick={() => goToSection(section.id)}
                            >
                                {section.icon}
                                <span>{section.title}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="contacts-main">
                <div className="contacts-toolbar" {...frame?.dragProps}>
                    <h3 className="contacts-title" id={frame?.titleId}>{frame?.title}</h3>
                </div>

                <div className="contacts-scroll" ref={scrollRef} onScroll={handleScroll}>
                    <ContactCard getSectionId={getSectionId} />
                </div>
            </div>
        </div>
    );
};

export default ContactsApp;
