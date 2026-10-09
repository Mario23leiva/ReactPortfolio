import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from './ContactsIcons.jsx';
import contact from '../../../../assets/json/contact.json';
import profileData from '../../../../assets/json/my-profile.json';
import profileImg from '../../../../assets/profile-picture.webp';
import { useI18n } from '../../../../i18n/I18nContext.js';

export const CONTACT_SECTION = 'contact';
const RESUME_URL = 'cv/Mario-Leiva-Torres-CV.pdf';

// "https://www.linkedin.com/in/x/" → "linkedin.com/in/x"
const prettyUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

// "2024-01" → "ene 2024" / "Jan 2024"
const formatMonth = (value, language) =>
    new Intl.DateTimeFormat(language, { month: 'short', year: 'numeric' }).format(new Date(`${value}-01T00:00:00`));

const ExternalLink = ({ href, children, ...props }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
);

const Chips = ({ items }) => (
    <ul className="contact-chips">
        {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
);

// Filas etiqueta/valor de cada sección de my-profile.json: [{ key, label, value }]
const getSectionRows = (item, { t, localize, language }) => {
    if (item.aboutMe) {
        return [{ key: 'note', label: t('contacts.note'), value: localize(item.aboutMe) }];
    }
    if (item.certificates) {
        return item.certificates.map((cert) => ({ key: cert.year, label: cert.year, value: localize(cert.title) }));
    }
    if (item.softSkills) {
        return [{ key: 'skills', label: t('contacts.personal'), value: <Chips items={item.softSkills.map(localize)} /> }];
    }
    if (item.categories) {
        return item.categories.map((category) => ({
            key: category.name,
            label: category.name,
            value: <Chips items={category.technologies} />,
        }));
    }
    if (item.languages) {
        return item.languages.map((lang) => ({ key: lang.name.en, label: localize(lang.level), value: localize(lang.name) }));
    }
    if (item.works) {
        return item.works.map((work) => ({
            key: work.from,
            label: `${formatMonth(work.from, language)} – ${work.to ? formatMonth(work.to, language) : t('profile.now')}`,
            value: (
                <>
                    <strong className="contact-row-title">{localize(work.name)}</strong>
                    <span className="contact-row-detail">{localize(work.description)}</span>
                </>
            ),
        }));
    }
    return [];
};

const Section = ({ id, title, rows }) => (
    <section className="contact-group" id={id}>
        {title && <h3 className="contact-group-title">{title}</h3>}
        <dl className="contact-group-list">
            {rows.map((row) => (
                <div className="contact-row" key={row.key}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                </div>
            ))}
        </dl>
    </section>
);

// Ficha de la app Contactos: cabecera, botones de acción, datos de contacto y secciones del perfil.
// La comparten el Mac y el iPhone; cambia solo el CSS (clase "phone").
// getSectionId(id): id del DOM de cada sección, para poder desplazarse a ella
const ContactCard = ({ phone = false, getSectionId }) => {
    const i18n = useI18n();
    const { t, localize } = i18n;
    const name = `${contact.firstName} ${contact.lastName}`;
    const location = localize(contact.location);

    const actions = [
        contact.email && { id: 'mail', label: t('contacts.mail'), icon: <MailIcon />, href: `mailto:${contact.email}` },
        contact.github && { id: 'github', label: 'GitHub', icon: <GitHubIcon />, href: contact.github, external: true },
        contact.linkedin && { id: 'linkedin', label: 'LinkedIn', icon: <LinkedInIcon />, href: contact.linkedin, external: true },
        { id: 'resume', label: t('contacts.resume'), title: t('profile.downloadResume'), icon: <DownloadIcon />, href: RESUME_URL, download: true },
    ].filter(Boolean);

    const contactRows = [
        contact.email && {
            key: 'email',
            label: t('contacts.email'),
            value: <a href={`mailto:${contact.email}`}>{contact.email}</a>,
        },
        contact.github && {
            key: 'github',
            label: 'GitHub',
            value: <ExternalLink href={contact.github}>{prettyUrl(contact.github)}</ExternalLink>,
        },
        contact.linkedin && {
            key: 'linkedin',
            label: 'LinkedIn',
            value: <ExternalLink href={contact.linkedin}>{prettyUrl(contact.linkedin)}</ExternalLink>,
        },
        location && { key: 'location', label: t('contacts.location'), value: location },
    ].filter(Boolean);

    return (
        <article className={`contact-card${phone ? ' phone' : ''}`}>
            <header className="contact-header">
                <img src={profileImg} alt="" className="contact-avatar" draggable="false" />
                <h2 className="contact-name">{name}</h2>
                <p className="contact-role">{t('profile.role')}</p>
                {location && <p className="contact-location">{location}</p>}
            </header>

            <ul className="contact-actions" aria-label={t('contacts.actions')}>
                {actions.map((action) => (
                    <li key={action.id}>
                        <a
                            className="contact-action"
                            href={action.href}
                            title={action.title ?? action.label}
                            download={action.download || undefined}
                            {...(action.external && { target: '_blank', rel: 'noopener noreferrer' })}
                        >
                            <span className="contact-action-icon">{action.icon}</span>
                            <span className="contact-action-label">{action.label}</span>
                        </a>
                    </li>
                ))}
            </ul>

            <Section id={getSectionId?.(CONTACT_SECTION)} rows={contactRows} />

            {profileData.map((item) => (
                <Section
                    key={item.id}
                    id={getSectionId?.(item.id)}
                    title={localize(item.title)}
                    rows={getSectionRows(item, i18n)}
                />
            ))}
        </article>
    );
};

export default ContactCard;
