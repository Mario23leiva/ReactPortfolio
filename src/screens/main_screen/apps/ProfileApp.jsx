import React, { useState } from 'react';
import './ProfileApp.css';
import ProfileAppItem from './ProfileAppItem';

import profileImg from './../../../assets/foto_epica_redonda.png';

const ProfileApp = ({ AppName }) => {
  const [checkedItems, setCheckedItems] = useState({
    first: true,
    second: false,
    third: false,
    fourth: false,
    fifth: false,
    sixth: false,
  });

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
          <ProfileAppItem number="first" title="About Me" description="" checked={checkedItems.first} onChange={handleCheckboxChange} />
          <ProfileAppItem number="second" title="Certifications" description="" checked={checkedItems.second} onChange={handleCheckboxChange} />
          <ProfileAppItem number="third" title="Soft Skills" description="" checked={checkedItems.third} onChange={handleCheckboxChange} />
          <ProfileAppItem number="fourth" title="It Lenguages" description="" checked={checkedItems.fourth} onChange={handleCheckboxChange} />
          <ProfileAppItem number="fifth" title="Lenguages" description="" checked={checkedItems.fifth} onChange={handleCheckboxChange} />
          <ProfileAppItem number="sixth" title="Professional Experience" description="" checked={checkedItems.sixth} onChange={handleCheckboxChange} />
        </ul>
      </div>
    </div>
  );
}

export default ProfileApp;
