
var http = require('http')
var fs = require('fs')

var noOfHome = 0;
var server = http.createServer(function (req, resp) {
    //Home page

    if (req.method === 'GET') {

        if (req.url === "/") {
            fs.readFile("index.html", function (error, page) {
                if (error) {
                    resp.writeHead(404)
                    resp.write('Sidan kan inte hittas')
                } else {
                    noOfHome++;
                    console.log("Home: " + noOfHome)
                    resp.writeHead(200, { 'Content-Type': 'text/html' })
                    resp.write(page)
                }
                
                resp.end();
            });
        } else if (req.url === "/om-oss") {
            resp.writeHead(200, { 'Content-Type': 'text/html' })
            resp.write('<h1>Om oss</h1>')
            resp.end()
        } else {
            resp.writeHead(404)
            resp.write('Sidan kan inte hittas')
            resp.end()
        }
    } 
    else 
    if (req.method === 'POST') { 
    }
    else {
        // No allowed
    }

})

server.listen(5050)
 
console.log('Server Started listening on 5050')