import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';


const TextContainer = ({ users }) => (
  <div className="text-container">
    <div>
      <h1>Realtime Chat Application <span role='img' aria-label="emoji">💬</span></h1>
      <h2>Created with React, Express, Node and Socket.IO <span role="img" aria-label="emoji">❤️</span></h2>
      <h2>Try it out right now! <span role="img" aria-label="emoji">⬅️</span></h2>
    </div>
    {
      users ? (
        <div>
          <h1>People Chatting</h1>
          <div className="text-container-active">
            <h2>
              {users.map(({name}) => (
                <div key={name} className="text-active-item">
                  {name}
                  <img src={onlineIcon} alt="online"/>
                </div>
              ))}
              </h2>
          </div>
        </div>
      )
      : null
    }
  </div>
);

export default TextContainer