require('dotenv').config();

const express = require('express'),
  bodyParser = require('body-parser'),
  massive = require('massive'),
  faker = require('faker'),
  session = require('express-session'),
  socketIo = require('socket.io');

let messages = [];

const { CONNECTION_STRING, PORT, SESSION_SECRET } = process.env;

const app = express();

app.use(express.static(__dirname + '/../build'))

app.use(bodyParser.json());

// Wrap socket in the app.listen
const io = socketIo(
  app.listen(PORT || 3010, () => console.log(`Hard to port ${PORT || 3010}`))
);

var users = [];

io.on('connection', socket => {
  console.log('client: ' + socket.id)

  socket.emit('id', socket.id)

  users.push({
    id: socket.id,
  })
  io.emit('users', users)

  socket.on('username', (username) => {
    let newUsers = users.map( user => {
      if(user.id === socket.id){
        user.name = username
      }
      return user
    })
    io.emit('users', newUsers);
  })

  socket.on('message', ({body, from}) => {
    socket.broadcast.emit('message', {
      body,
      from
    })
  })

  socket.on('disconnect', () => {
    console.log('disconnected: ' + socket.id)
    users = users.filter( user => {
      return socket.id !== user.id
    })
    socket.broadcast.emit('users', users)
  })
});




