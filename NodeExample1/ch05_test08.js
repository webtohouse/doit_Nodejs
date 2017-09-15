// 서버에서 다른 웹 사이트 데이터를 가져와 응답하기
// POST 방식으로 요청하기 -> request() 메소드 사용.

var http = require('http');

// var port = 3000;
// var hostname = '127.0.0.1';
//
// var server = http.createServer();
// server.listen(port, hostname, function(req, res) {
//     console.log('서버실행 : %s:%d', hostname, port);
// });

var opts = {
    host: 'www.google.com',
    port: 80,
    method: 'POST',
    path: '/',
    headers: {}
};

var resData = '';
var req = http.request(opts, function(res) {
    // 응답처리
    res.on('data', function(chunk) {
        resData += chunk;
    });

    res.on('end', function() {
        console.log(resData);
    });
});

opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
req.data = "q=actor";
opts.headers['Cosearch?q=actorntent-Length'] = req.data.length;

req.on('error', function(err) {
    console.log("오류발생 : " + err.message);
});

// 요청 전송
req.write(req.data);
req.end();
