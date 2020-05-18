import React from 'react';

import './Input.css';

const Input = ({ message, setMessage, sendMessage }) => (
    <form className="input-form">
      <input
      className="input-input"
      type="text"
      placeholder="Enter your message..."
      value={message}
      onChange={ ({ target: { value } }) => setMessage(value)}
      onKeyPress={e => e.key ==='Enter'? sendMessage(e) : null}
      />
      <button className="input-sendButton" onClick={e => sendMessage(e)}>Send</button>
    </form>
)

export default Input
