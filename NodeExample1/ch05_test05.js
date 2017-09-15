// 클라이언트에서 요청이 있을 때 파일 읽어 응답하기

var http = require('http');
var fs = require('fs');

var port = 3000;
var hostname = '127.0.0.1';

var server = http.createServer();
server.listen(port, hostname, function(req, res) {
    console.log('서버실행 : %s:%d', hostname, port);
});

// 클라이언트 이벤트 처리
server.on('request', function(req, res) {
    console.log('클라이언트 요청이 들어옮');

    var fileName = 'house.png';
    fs.readFile(fileName, function(err, data) {
        res.writeHead(200, {"Content-Type": "image/png"});
        res.write(data);
        res.end();
    });
});
