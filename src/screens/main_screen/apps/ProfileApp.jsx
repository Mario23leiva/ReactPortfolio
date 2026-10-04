import { useState } from 'react';
import './ProfileApp.css';
import ProfileAppItem from './ProfileAppItem';
import profileImg from './../../../assets/profile-picture.jpeg';
import profileData from './../../../assets/json/my-profile.json';


const ProfileApp = () => {
  // "About Me" abierto por defecto, el resto cerrado
  const [checkedItems, setCheckedItems] = useState(
    profileData.reduce((acc, item) => {
      acc[item.id] = item.aboutMe !== undefined;
      return acc;
    }, {})
  );

  const toggleItem = (id) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
  };

  return (
    <div className="profile-app">
      <div className="profile-app-top-container">
        <div className="profile-app-top-container-user-info">
          <img src={profileImg} alt="Mario Leiva Torres" className="profile-app-img" />
          <div className="profile-app-user-details">
            <p>Mario Leiva Torres</p>
            <p>Full Stack Developer</p>
            <p>marioleivatorres23@gmail.com</p>
            <a className="btn-download-resume" href="cv/Mario-Leiva-Torres-CV.pdf" download>Download Resume</a>
          </div>
        </div>
      </div>
      <div className="profile-app-main-container">
        <ul className="profile-app-main-container-accordion">
          {profileData.map((item) => (
            <ProfileAppItem
              key={item.id}
              number={item.id}
              title={item.titulo}
              aboutMe={item.aboutMe || ""}
              certificates={item.certificates || []}
              softSkills={item["soft-skills"] || []}
              categories={item.categories || []}
              languages={item.lenguages || []}
              works={item.works || []}
              checked={checkedItems[item.id]}
              onToggle={() => toggleItem(item.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProfileApp;
