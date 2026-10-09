// Iconos SF Symbols simplificados para el Finder. Usan currentColor.
const Svg = ({ children, ...props }) => (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
        {children}
    </svg>
);

export const ChevronLeftIcon = () => <Svg><path d="M10 3 5 8l5 5" /></Svg>;

export const ChevronRightIcon = () => <Svg><path d="m6 3 5 5-5 5" /></Svg>;

export const IconsViewIcon = () => (
    <Svg strokeWidth="1.3">
        <rect x="2" y="2" width="5" height="5" rx="1" />
        <rect x="9" y="2" width="5" height="5" rx="1" />
        <rect x="2" y="9" width="5" height="5" rx="1" />
        <rect x="9" y="9" width="5" height="5" rx="1" />
    </Svg>
);

export const ListViewIcon = () => (
    <Svg strokeWidth="1.3">
        <path d="M5.5 4h8.5M5.5 8h8.5M5.5 12h8.5" />
        <circle cx="2.5" cy="4" r=".6" fill="currentColor" />
        <circle cx="2.5" cy="8" r=".6" fill="currentColor" />
        <circle cx="2.5" cy="12" r=".6" fill="currentColor" />
    </Svg>
);

export const SearchIcon = () => (
    <Svg strokeWidth="1.4">
        <circle cx="7" cy="7" r="4.5" />
        <path d="m10.5 10.5 3.5 3.5" />
    </Svg>
);

export const FolderIcon = () => (
    <Svg strokeWidth="1.3">
        <path d="M1.75 4.25c0-.83.67-1.5 1.5-1.5h3l1.5 1.5h5c.83 0 1.5.67 1.5 1.5v6.5c0 .83-.67 1.5-1.5 1.5h-9.5c-.83 0-1.5-.67-1.5-1.5Z" />
        <path d="M1.75 6.25h12.5" />
    </Svg>
);

export const DiskIcon = () => (
    <Svg strokeWidth="1.3">
        <rect x="1.75" y="4.75" width="12.5" height="6.5" rx="1.5" />
        <circle cx="11.5" cy="8" r=".6" fill="currentColor" />
    </Svg>
);
