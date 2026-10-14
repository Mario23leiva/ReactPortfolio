// Iconos de la app Fotos (trazos al estilo SF Symbols)
const Svg = ({ size = 16, children, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
        {children}
    </svg>
);

// Biblioteca: fotos apiladas
export const LibraryIcon = ({ size }) => (
    <Svg size={size}>
        <rect x="2" y="4.5" width="10" height="9" rx="1.8" />
        <path d="M4.5 2.5h7.3A1.7 1.7 0 0 1 13.5 4.2v6.8" />
        <path d="m3 12 2.6-2.8 1.9 1.9 1.4-1.4L11.5 12" />
        <circle cx="5.3" cy="7" r="0.9" />
    </Svg>
);

export const HeartIcon = ({ size, filled = false }) => (
    <Svg size={size} fill={filled ? 'currentColor' : 'none'}>
        <path d="M8 13.6S2 10.1 2 6.1A3.1 3.1 0 0 1 8 4.6a3.1 3.1 0 0 1 6 1.5c0 4-6 7.5-6 7.5Z" />
    </Svg>
);

export const ChevronLeftIcon = ({ size }) => (
    <Svg size={size} strokeWidth="1.8">
        <path d="M10 3 5 8l5 5" />
    </Svg>
);

export const ChevronRightIcon = ({ size }) => (
    <Svg size={size} strokeWidth="1.8">
        <path d="m6 3 5 5-5 5" />
    </Svg>
);

export const SearchIcon = ({ size = 13 }) => (
    <Svg size={size} strokeWidth="1.6">
        <circle cx="7" cy="7" r="4.5" />
        <path d="m10.4 10.4 3.1 3.1" />
    </Svg>
);

// Miniaturas pequeñas / grandes, a los lados del control de tamaño
export const ZoomOutIcon = ({ size }) => (
    <Svg size={size}>
        <rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" />
        <rect x="9" y="2.5" width="4.5" height="4.5" rx="1" />
        <rect x="2.5" y="9" width="4.5" height="4.5" rx="1" />
        <rect x="9" y="9" width="4.5" height="4.5" rx="1" />
    </Svg>
);

export const ZoomInIcon = ({ size }) => (
    <Svg size={size}>
        <rect x="2.5" y="2.5" width="11" height="11" rx="1.8" />
    </Svg>
);
