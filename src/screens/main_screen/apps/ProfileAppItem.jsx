const ProfileAppItem = ({ number, title, aboutMe, certificates, softSkills, categories, languages, works, checked, onToggle }) => {
  const inputId = `profile-section-${number}`;

  return (
    <li className='profile-app-main-container-accordion-item'>
      <input type="checkbox" name="accordion" id={inputId} checked={checked} onChange={onToggle} />
      <label htmlFor={inputId}>{title}</label>
      <div className="content">
        {aboutMe && <p>{aboutMe}</p>}
        {certificates.length > 0 && (
          <ul>
            {certificates.map(cert => (
              <li key={cert.id + cert.title} style={{margin: 10 + "px"}}>
                {cert.title} ({cert.year})
              </li>
            ))}
          </ul>
        )}
        {softSkills.length > 0 && (
          <p>{softSkills.map(skill => skill.name).join(" | ")}</p>
        )}
        {categories.length > 0 && categories.map(category => (
          <div key={category.id + category.name}>
            <h4>{category.name}</h4>
            <p style={{margin: 10 + 'px'}}>
              {category["it-lenguages"].map(lang => lang.name).join(" | ")}
            </p>
          </div>
        ))}
        {languages.length > 0 && (
          <p>{languages.map(lang => `${lang.name} (${lang.level})`).join(" | ")}</p>
        )}
        {works.length > 0 && (
          <ul>
            {works.map(work => (
              <li key={work.id + work.name} style={{margin: 10 + "px"}}>
                <h4>{work.name}</h4>
                <p>{work["year-from"]} - {work["year-to"]}</p>
                <p>{work.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

export default ProfileAppItem;
