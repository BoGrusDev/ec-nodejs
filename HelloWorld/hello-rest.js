const http = require('http');
const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', data2 => {
            body += data2.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            //console.log(body);
            var data = JSON.parse(body);
            var reply = {};
            reply.name = data.first_name + ', ' + data.last_name;
            reply.mobile = '+46 ' + data.mobile;
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify(reply));

        });
    }
    else {
        res.end(('GET not allowed'));
    }
});

server.listen(3001);

/*
    {
	"first_name" : "Jan",
	"last_name" : "Testsson",
	"email" : "jan@test.com",
	"mobile" : "070999999"
}
*/

