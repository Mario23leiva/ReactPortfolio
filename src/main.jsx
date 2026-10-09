import { createRoot } from 'react-dom/client';
import App from './App';
import I18nProvider from './i18n/I18nProvider.jsx';
import ThemeProvider from './theme/ThemeProvider.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
    <I18nProvider>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </I18nProvider>,
);
