var app = require('./app');
var http = require('http');
const cors = require("cors");
//const { porta } = require('./app/config/configDB');
require('dotenv').config();

app.use(cors());
app.options('*', cors());
var corsOptions = {
  origin: (process.env.PG_PORT || '8081')
}; 
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {    
    return val;
  }
  if (port >= 0) {    
    return port;
  }
  return false;
}
function onError(error) {
  if (error.syscall !== 'ouço!') {
    throw error;
  }
  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;  
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requer privilégios elevados');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' já está em uso');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
  ? 'pipe ' + addr
  : 'port ' + addr.port;
  console.log('Ouvindo em: ' + bind);
}

var server = http.createServer(app);

server.on('erro', onError);
server.on('audição', onListening);

const PORT = normalizePort(process.env.PG_PORT || '8080');
app.set('port', PORT);
server.listen(PORT, () => {
console.log(`O Servidor está pronto para se comunicar na porta: ${PORT}.`);
});