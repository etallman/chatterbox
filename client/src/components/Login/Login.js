import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Login.css';


const Login = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="login-container">
      <div className="login-container-inner">
         <h1 className="login-header">Log in</h1>
          <div>
            <input placeholder="Enter your username" className="login-input" type="text" onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <div>
            <input placeholder="Add a Room" className="login-input mt-20" type="text"
              onChange={(e) => setRoom(e.target.value)} />
          </div>
          <Link onClick={ e => (!name || !room) ? e.preventDefault() : null } to={ `/chat?name=${name}&room=${room}` }>
            <button className="login-button mt-20" type="submit">Sign In</button>
          </Link>
      </div>
    </div>
  )
}

export default Login
