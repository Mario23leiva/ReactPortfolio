// Iconos SF Symbols simplificados para Contactos. Usan currentColor.
const Svg = ({ children, ...props }) => (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
        {children}
    </svg>
);

export const MailIcon = () => (
    <Svg>
        <rect x="1.75" y="3.25" width="12.5" height="9.5" rx="1.5" />
        <path d="m2.25 4 5.75 4.5L13.75 4" />
    </Svg>
);

export const GitHubIcon = () => (
    <Svg fill="currentColor" stroke="none">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </Svg>
);

export const LinkedInIcon = () => (
    <Svg>
        <rect x="1.75" y="1.75" width="12.5" height="12.5" rx="2.5" />
        <path d="M5 7.25V11M8 11V7.25M8 9c0-1 .75-1.75 1.75-1.75S11 8 11 9v2" />
        <circle cx="5" cy="5" r=".5" fill="currentColor" />
    </Svg>
);

export const DownloadIcon = () => (
    <Svg>
        <path d="M8 2v8M4.75 6.75 8 10l3.25-3.25M2.5 12.5v1h11v-1" />
    </Svg>
);

export const ShareIcon = () => (
    <Svg>
        <path d="M8 1.75V9.5M5.25 4.25 8 1.5l2.75 2.75" />
        <path d="M5.5 6.5H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-1.5" />
    </Svg>
);

export const PersonIcon = () => (
    <Svg>
        <circle cx="8" cy="5.25" r="2.75" />
        <path d="M2.75 14c.4-2.75 2.6-4.5 5.25-4.5s4.85 1.75 5.25 4.5" />
    </Svg>
);

export const SectionIcon = () => (
    <Svg strokeWidth="1.3">
        <rect x="2" y="2" width="12" height="12" rx="2.5" />
        <path d="M5 6h6M5 8.5h6M5 11h3.5" />
    </Svg>
);

export const ChevronLeftIcon = () => (
    <Svg width="12" height="20" viewBox="0 0 12 20" strokeWidth="2.6">
        <path d="M10 2 2 10l8 8" />
    </Svg>
);
