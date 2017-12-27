const http = require('http');
const express = require('express');

const port = 9527;
const app = express();

// app.get('/', function(req, res){
//     res.writeHead(200, {
//         'Content-Type': 'text/html'
//     });
//     res.write('<h2>hello world!</h2>');
//     res.end();
// });

// app.listen(port, function(){
//     console.log('app is listening at port ' + port);
// });

let server = require('http').createServer(app);
app.use('/', express.static(__dirname + '/html'));
server.listen(port);