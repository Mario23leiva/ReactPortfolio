import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBatteryFull, faSignal, faWifi } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from '../../../i18n/I18nContext.js';
import { formatTime, useClock } from '../../../hooks/useClock.js';

// Barra de estado de iOS: hora, Dynamic Island y cobertura / wifi / batería
const StatusBar = ({ dark }) => {
    const { language, t } = useI18n();
    const now = useClock();

    return (
        <div className={`phone-status-bar${dark ? ' dark' : ''}`}>
            <time className="phone-status-time" dateTime={now.toISOString()}>{formatTime(now, language)}</time>
            <span className="phone-island" aria-hidden="true"></span>
            <span className="phone-status-icons" role="img" aria-label={t('phone.status')}>
                <FontAwesomeIcon icon={faSignal} />
                <FontAwesomeIcon icon={faWifi} />
                <FontAwesomeIcon icon={faBatteryFull} className="phone-battery" />
            </span>
        </div>
    );
};

export default StatusBar;
