import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";


import ChatHeader from '../ChatHeader/ChatHeader';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

import "./Chat.css";


let socket;

const Chat = ({ location }) => {
  const baseURL = "localhost:5000";
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(baseURL);
    setName(name);
    setRoom(room);

    socket.emit('login', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [baseURL, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);
  
  const sendMessage = (e) => {
    e.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className='chat-container'>
      <div className='chat-container-inner'>
        <ChatHeader room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
