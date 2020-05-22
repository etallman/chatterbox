const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require('./users.js');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);


io.on('connect', (socket) => {
  socket.on('login', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    
    if (error) {
      return callback(error);
    }
    
    socket.join(user.room);
    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to ${user.room}!` });
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!`});
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    callback();
   });

   socket.on('sendMessage', (message, callback) => {
     const user = getUser(socket.id);

     io.to(user.room).emit('message', { user: user.name, text: message });
     callback();
   })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    
    if (user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `Oh no, ${user.name} has left us` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
  })
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));