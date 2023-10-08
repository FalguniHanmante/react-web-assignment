import React from 'react';

import PostsList from './components/PostsList';
import Logo from './images/ChirpzLogoVector.svg';
import Menu from './images/Menu.svg';
import ProfilePhoto from './images/ProfilePicture.png'

import './App.css';

function App() {
  return (
    <div className="container">
      <div className="left-section">
        <div className='logo margin-20'>
          <img src={Logo} alt='app-logo' height={64} width={64} />
        </div>

      </div>
      <PostsList user={'John Doe'} />

      <div className="right-section">
        <div className='profile-container margin-20'> 
          <img src={ProfilePhoto} alt="profile-icon" height={32} width={32} />
          <img src={Menu} alt='menu-icon' height={32} width={32} />
        </div>

      </div>
    </div>
  );
}

export default App;
