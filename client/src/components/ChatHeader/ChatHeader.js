import React from 'react';

import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';

import './ChatHeader.css';


const ChatHeader = ({ room }) => {
  return (
    <div className="chat-container-header">
      <div className="chat-header-left">
        <img className="online-icon" src={onlineIcon}  alt="online"/>
        <h3>{room}</h3>
      </div>
      <div className="chat-header-right">
        <a href="/"><img src={closeIcon} alt="close" /></a>
      </div>
    </div>
  )
}

export default ChatHeader
