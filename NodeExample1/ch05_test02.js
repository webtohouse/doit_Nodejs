// 웹 브라우저에서 요청할 때 어떤 이벤트가 발생하는지 확인하기

var http = require('http');

// 웹서버 객체를 만듭니다.
var server = http.createServer();

// 웹 서버를 시작하여 3000번 포트에서 대기하도록 설정 합니다.

var port = 3000;

server.listen(port, function() {
    console.log('서버가 실행 되었습니다. : %d', port);
});

// 클라이언트 연결 이벤트
server.on('connection', function(socket) {
    var addr = socket.address();
    console.log('클라이언트가 접속 했습니다. : %s, %d', addr.address, addr.port);
});

 // 클라이언트 요청 이벤트 처리
server.on('request', function(req, res) {
    console.log('클라이언트 요청이 들어 왔습니다.');
    console.dir(req);
});

// 서버 종료 이벤트 처리
server.on('close', function() {
    console.log('서버가 종료 되었습니다.');
});
