import { APPS, DOCK_LINKS } from '../appsConfig.js';
import { BROWSER_WINDOW } from '../browser/browserState.js';
import { useI18n } from '../../../i18n/I18nContext.js';
import { useTheme } from '../../../theme/ThemeContext.js';
import { THEME_ICONS } from '../../../theme/themeIcons.js';
import ProfilePicture from '../../../assets/profile-picture.webp';

// label: nombre accesible si el visible se queda corto (p. ej. "Apariencia: Oscura")
const AppIcon = ({ name, label, icon, onClick, href }) => {
    const content = (
        <>
            <img src={icon} alt="" draggable="false" />
            <span>{name}</span>
        </>
    );
    return href ? (
        <a className="phone-icon" href={href} target="_blank" rel="noopener noreferrer">{content}</a>
    ) : (
        <button type="button" className="phone-icon" onClick={onClick} aria-label={label}>{content}</button>
    );
};

// Pantalla de inicio: widget de perfil, iconos sueltos y dock con las apps
const HomeScreen = ({ onOpenApp, onOpenBrowser }) => {
    const { t } = useI18n();
    const { preference, cycleTheme } = useTheme();

    return (
        <div className="phone-home">
            <button type="button" className="phone-widget" onClick={() => onOpenApp('PROFILE')}>
                <img src={ProfilePicture} alt="" draggable="false" />
                <span className="phone-widget-text">
                    <strong>Mario Leiva Torres</strong>
                    <span>{t('profile.role')}</span>
                </span>
            </button>

            <ul className="phone-grid">
                {DOCK_LINKS.map((link) => (
                    <li key={link.id}>
                        <AppIcon name={t(link.nameKey)} icon={link.icon} href={link.url} />
                    </li>
                ))}
                <li>
                    <AppIcon
                        name={t('theme.short')}
                        label={t('theme.label', { mode: t(`theme.${preference}`) })}
                        icon={THEME_ICONS[preference]}
                        onClick={cycleTheme}
                    />
                </li>
            </ul>

            <div className="phone-page-dots" aria-hidden="true"><span></span></div>

            <nav className="phone-dock" aria-label={t('dock.label')}>
                {APPS.map((app) => (
                    <AppIcon key={app.id} name={t(app.nameKey)} icon={app.icon} onClick={() => onOpenApp(app.id)} />
                ))}
                <AppIcon name={t('browser.name')} icon={BROWSER_WINDOW.icon} onClick={onOpenBrowser} />
            </nav>
        </div>
    );
};

export default HomeScreen;
