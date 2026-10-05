import { useEffect, useState } from 'react';

// Fecha actual, actualizada al empezar cada minuto
export function useClock() {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        let timeout;
        const tick = () => {
            const date = new Date();
            setNow(date);
            timeout = setTimeout(tick, 60000 - date.getSeconds() * 1000 - date.getMilliseconds());
        };
        tick();
        return () => clearTimeout(timeout);
    }, []);

    return now;
}

// Hora como en iOS: 24 h en castellano ("21:41") y 12 h sin AM/PM en inglés ("9:41")
export const formatTime = (date, language) => {
    const minutes = String(date.getMinutes()).padStart(2, '0');
    if (language === 'es') {
        return `${String(date.getHours()).padStart(2, '0')}:${minutes}`;
    }
    return `${date.getHours() % 12 || 12}:${minutes}`;
};

// "martes, 6 de octubre" / "Tuesday, October 6"
export const formatDate = (date, language) =>
    date.toLocaleDateString(language, { weekday: 'long', day: 'numeric', month: 'long' });
