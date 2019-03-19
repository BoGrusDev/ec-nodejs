const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

var noOfCalls = 0;

const server = http.createServer((req, res) => {
  
  console.log(req.url);

    if(req.url == "/") { 
      
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello World\n');
      noOfCalls++;
      console.log('call: ' + noOfCalls);
    } 
    else if(req.url.match("/favicon.ico") ) {
      console.log('Favicon.ic');
    } 
    
  });

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


//console.log(req);
  /*
  if(req.url.match("/favicon.ico") ) {
    console.log('Favicon.ic');
  } 
  else {'/'
  */
