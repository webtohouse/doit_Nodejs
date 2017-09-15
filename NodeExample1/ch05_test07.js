// 서버에서 다른 웹 사이트 데이터를 가져와 응답하기
// Get 방식으로 요청하기

var http = require('http');

// var port = 3000;
// var hostname = '127.0.0.1';
//
// var server = http.createServer();
// server.listen(port, hostname, function(req, res) {
//     console.log('서버실행 : %s:%d', hostname, port);
// });

var options = {
    host: 'www.google.com',
    port: 80,
    path: '/'
};

var req = http.get(options, function(res) {
    // 응답처리
    var resData = '';
    res.on('data', function(chunk) {
        resData += chunk;
    });

    res.on('end', function() {
        console.log(resData);
    });
});

req.on('error', function(err) {
    console.log("오류발생 : " + err.message);
});
