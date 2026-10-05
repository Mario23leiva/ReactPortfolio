import { useEffect, useState } from 'react';

// Pantallas en las que el portfolio se muestra como un iPhone en lugar de como un Mac
export const PHONE_QUERY = '(max-width: 640px)';

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

    useEffect(() => {
        const media = window.matchMedia(query);
        const handleChange = () => setMatches(media.matches);
        handleChange();
        media.addEventListener('change', handleChange);
        return () => media.removeEventListener('change', handleChange);
    }, [query]);

    return matches;
}
