const debug = require('debug')('expanse:server');
const http = require('http');
const ip = require('ip');
const app = require('../app');

// Create HTTP server.
const server = http.createServer(app);

// Normalize a port into a number, string, or false.
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (typeof port != 'number') { return val; }
  if (port >= 0) { return port; }
  return false;
}

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') { throw error; }
  const bind = (typeof port === 'string') ? `Pipe ${port}` : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  const addr = server.address();
  const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Production run on http://${ip.address()}:${port} | You know what to do ♥`);
  debug(`Development run on http://${ip.address()}:${port} | You know what to do ♥`);
}

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
