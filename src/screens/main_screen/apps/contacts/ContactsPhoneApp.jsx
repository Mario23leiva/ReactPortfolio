import './Contacts.css';
import ContactCard from './ContactCard.jsx';
import { ChevronLeftIcon, ShareIcon } from './ContactsIcons.jsx';
import { shareContact } from './vcard.js';
import { useI18n } from '../../../../i18n/I18nContext.js';

// App Contactos del iPhone: la ficha de contacto de iOS, con la misma información que en el Mac
const ContactsPhoneApp = () => {
    const i18n = useI18n();
    const { t } = i18n;

    return (
        <div className="contacts-phone">
            <header className="contacts-phone-nav">
                {/* Decorativos: solo hay una ficha y es de solo lectura */}
                <span className="contacts-phone-back" aria-hidden="true">
                    <ChevronLeftIcon />
                    {t('contacts.back')}
                </span>
                <button type="button" className="contacts-phone-edit" aria-disabled="true" title={t('contacts.readOnly')}>
                    {t('contacts.edit')}
                </button>
            </header>

            <ContactCard phone />

            <button type="button" className="contacts-phone-share" onClick={() => shareContact(i18n)}>
                <span>{t('contacts.shareContact')}</span>
                <ShareIcon />
            </button>
        </div>
    );
};

export default ContactsPhoneApp;
