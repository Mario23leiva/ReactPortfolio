import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import projects from '../../../../assets/json/projects.json';
import { getAsset } from '../../../../utils/assets.js';
import { useI18n } from '../../../../i18n/I18nContext.js';
import { getProjectUrl, resolveAddressInput } from '../browserState.js';

const LOGO = 'Mario';

// Página de pestaña nueva: buscador de proyectos y accesos directos
const NewTabPage = ({ onNavigate }) => {
    const { t } = useI18n();
    const [query, setQuery] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const target = resolveAddressInput(query);
        if (target) {
            onNavigate(target);
        }
    };

    return (
        <div className="newtab-page">
            <h1 className="newtab-logo" aria-label={LOGO}>
                {[...LOGO].map((letter, index) => <span key={index} aria-hidden="true">{letter}</span>)}
            </h1>
            <form className="newtab-search" onSubmit={handleSubmit} role="search">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input
                    type="text"
                    value={query}
                    placeholder={t('browser.home.search')}
                    aria-label={t('browser.home.search')}
                    spellCheck="false"
                    autoComplete="off"
                    onChange={(event) => setQuery(event.target.value)}
                />
            </form>
            <h2 className="newtab-heading">{t('browser.home.heading')}</h2>
            <ul className="newtab-shortcuts">
                {projects.map((project) => (
                    <li key={project.id}>
                        <button type="button" onClick={() => onNavigate(getProjectUrl(project))}>
                            <img src={getAsset(project.page?.cover)} alt="" draggable="false" />
                            <span>{project.title}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewTabPage;
