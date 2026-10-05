import { useI18n } from '../../../i18n/I18nContext.js';

const ProfileAppItem = ({ item, checked, onToggle }) => {
  const { t, localize } = useI18n();
  const { aboutMe, certificates = [], softSkills = [], categories = [], languages = [], works = [] } = item;
  const inputId = `profile-section-${item.id}`;

  return (
    <li className='profile-app-main-container-accordion-item'>
      <input type="checkbox" name="accordion" id={inputId} checked={checked} onChange={onToggle} />
      <label htmlFor={inputId}>{localize(item.title)}</label>
      <div className="content">
        {aboutMe && <p>{localize(aboutMe)}</p>}
        {certificates.length > 0 && (
          <ul>
            {certificates.map(cert => (
              <li key={cert.year} style={{margin: 10 + "px"}}>
                {localize(cert.title)} ({cert.year})
              </li>
            ))}
          </ul>
        )}
        {softSkills.length > 0 && (
          <p>{softSkills.map(localize).join(" | ")}</p>
        )}
        {categories.length > 0 && categories.map(category => (
          <div key={category.name}>
            <h4>{category.name}</h4>
            <p style={{margin: 10 + 'px'}}>
              {category.technologies.join(" | ")}
            </p>
          </div>
        ))}
        {languages.length > 0 && (
          <p>{languages.map(lang => `${localize(lang.name)} (${localize(lang.level)})`).join(" | ")}</p>
        )}
        {works.length > 0 && (
          <ul>
            {works.map(work => (
              <li key={work.from} style={{margin: 10 + "px"}}>
                <h4>{localize(work.name)}</h4>
                <p>{work.from} - {work.to ?? t('profile.now')}</p>
                <p>{localize(work.description)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

export default ProfileAppItem;
