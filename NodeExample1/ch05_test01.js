// 간단한 웹서버 만들기

var http = require('http');

// 웹서버 객체를 만듭니다.
var server = http.createServer();

// 웹서버를 시작하여 3000번 포트에서 대기 합니다.
var port = 3000;
server.listen(port, function() {
    console.log('웹서버가 시작되었습니다. %d', port);
});


// 웹서버를 시작하여 특정 IP와 Port에서 대기하도록 합니다.
var hostname = '192.168.0.23';
var port = 3002;

server.listen(port, hostname, '50000', function() {
    console.log('웹 서버가 시작되었습니다. : %s, %d', host, port);
});
