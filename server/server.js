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

io.on('connection', socket => {
  console.log('client: ' + socket.id)
  socket.on('message', ({body, from}) => {
    socket.broadcast.emit('message', {
      body,
      from
    })
  })
});


