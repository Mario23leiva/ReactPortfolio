import React, { useState, useEffect } from 'react';
import './ProfileApp.css';
import ProfileAppItem from './ProfileAppItem';
import profileImg from './../../../assets/profile-picture.jpeg';
import profileData from './../../../assets/json/my-profile.json';


const ProfileApp = ({ AppName }) => {
  const [checkedItems, setCheckedItems] = useState(
    profileData.reduce((acc, item) => {
      acc[item.id] = false;
      return acc;
    }, {})
  );

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: checked,
    }));
  };

  return (
    <div className="profile-app">
      <div className="profile-app-top-container">
        <div className="profile-app-top-container-user-info">
          <img src={profileImg} alt="Me" className="profile-app-img" />
          <div className="profile-app-user-details">
            <p>Mario Leiva Torres</p>
            <p>Full Stack Developer</p>
            <p>marioleivatorres23@gmail.com</p>
            <button className="btn-download-resume">Download Resume</button>
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
              onChange={handleCheckboxChange}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProfileApp;
