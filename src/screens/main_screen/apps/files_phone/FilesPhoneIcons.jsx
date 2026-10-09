import { useId } from 'react';

// Iconos SF Symbols simplificados para Archivos del iPhone. Usan currentColor salvo la carpeta.
const Svg = ({ children, size = 20, viewBox = '0 0 20 20', ...props }) => (
    <svg viewBox={viewBox} width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
        {children}
    </svg>
);

export const ChevronLeftIcon = () => (
    <Svg size={22} strokeWidth="2.6"><path d="M12.5 3.5 6 10l6.5 6.5" /></Svg>
);

export const ChevronRightIcon = () => (
    <Svg size={14} strokeWidth="2.4"><path d="m7 4 6 6-6 6" /></Svg>
);

export const SearchIcon = () => (
    <Svg size={16} strokeWidth="2.2">
        <circle cx="8.5" cy="8.5" r="5.5" />
        <path d="m13 13 4.5 4.5" />
    </Svg>
);

export const MoreIcon = () => (
    <Svg size={26} viewBox="0 0 26 26" strokeWidth="1.7">
        <circle cx="13" cy="13" r="11" />
        <circle cx="8.2" cy="13" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="13" cy="13" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="17.8" cy="13" r="1.2" fill="currentColor" stroke="none" />
    </Svg>
);

export const GridIcon = () => (
    <Svg size={18} strokeWidth="1.7">
        <rect x="2.5" y="2.5" width="6" height="6" rx="1.5" />
        <rect x="11.5" y="2.5" width="6" height="6" rx="1.5" />
        <rect x="2.5" y="11.5" width="6" height="6" rx="1.5" />
        <rect x="11.5" y="11.5" width="6" height="6" rx="1.5" />
    </Svg>
);

export const ListIcon = () => (
    <Svg size={18} strokeWidth="1.7">
        <path d="M7 5h11M7 10h11M7 15h11" />
        <circle cx="3" cy="5" r=".9" fill="currentColor" />
        <circle cx="3" cy="10" r=".9" fill="currentColor" />
        <circle cx="3" cy="15" r=".9" fill="currentColor" />
    </Svg>
);

export const PhoneIcon = () => (
    <Svg size={22} strokeWidth="1.7">
        <rect x="5.5" y="1.75" width="9" height="16.5" rx="2.2" />
        <path d="M8.75 4h2.5" />
    </Svg>
);

// Carpeta azul de iOS (con pestaña y degradado).
// Cada icono necesita su propio id de degradado: si se compartiera y el primero estuviera
// en una pantalla oculta, el navegador no podría pintarlo en los demás.
export const FolderIcon = ({ size = 64 }) => {
    // Sin los caracteres especiales de useId (":r0:") para que url(#...) sea siempre válido
    const gradientId = `ios-folder${useId().replace(/[^\w-]/g, '')}`;

    return (
        <svg viewBox="0 0 64 52" width={size} height={size * 52 / 64} aria-hidden="true" focusable="false">
            <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#6ec4fb" />
                    <stop offset="1" stopColor="#3aa2f2" />
                </linearGradient>
            </defs>
            <path d="M4 6a4 4 0 0 1 4-4h15.5a4 4 0 0 1 3 1.4L30 7h26a4 4 0 0 1 4 4v4H4Z" fill="#2f8fe0" />
            <rect x="2" y="11" width="60" height="39" rx="4.5" fill={`url(#${gradientId})`} />
            <path d="M2 15.5a4.5 4.5 0 0 1 4.5-4.5h51a4.5 4.5 0 0 1 4.5 4.5" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="1" />
        </svg>
    );
};
