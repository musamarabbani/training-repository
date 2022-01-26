const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');
dotenv.config({ path: './.env' });
const apiRoutes = require('./routes');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { origin: '*' });
global.io = io;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRoutes);

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log('server is running on port ', port);
});

server.on('error', onError);

function onError(error) {
  if (error.syscall !== 'listen') {
    console.log('error ==>', error);
    throw error;
  }
}
