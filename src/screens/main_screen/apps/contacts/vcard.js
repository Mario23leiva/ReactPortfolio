import contact from '../../../../assets/json/contact.json';
import profileData from '../../../../assets/json/my-profile.json';

// Botón "Compartir": descarga la ficha en formato vCard 3.0 (.vcf)

// Comas, puntos y comas, barras y saltos de línea se escapan según el estándar
const escape = (value) => String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/([,;])/g, '\\$1');

export const buildVCard = ({ t, localize }) => {
    const location = localize(contact.location);
    const note = localize(profileData.find((item) => item.aboutMe)?.aboutMe);
    const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${escape(contact.lastName)};${escape(contact.firstName)};;;`,
        `FN:${escape(`${contact.firstName} ${contact.lastName}`)}`,
        `TITLE:${escape(t('profile.role'))}`,
        contact.email && `EMAIL;TYPE=INTERNET:${contact.email}`,
        contact.github && `URL:${contact.github}`,
        contact.linkedin && `URL:${contact.linkedin}`,
        location && `ADR:;;;${escape(location)};;;`,
        note && `NOTE:${escape(note)}`,
        'END:VCARD',
    ];
    return lines.filter(Boolean).join('\r\n');
};

export const shareContact = (i18n) => {
    const url = URL.createObjectURL(new Blob([buildVCard(i18n)], { type: 'text/vcard' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${contact.firstName} ${contact.lastName}.vcf`;
    link.click();
    // Algunos navegadores empiezan la descarga después del clic: se libera un poco más tarde
    setTimeout(() => URL.revokeObjectURL(url), 1000);
};
