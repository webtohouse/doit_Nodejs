var express = require('express');
var http = require('http');

var app = express(); // express 서버 객체

// 속성설정
app.set('port', process.env.PORT || 3000);
app.set('views',__dirname + '/views');
app.set('wiew engine', 'jade');

// 미들웨어 설정
app.use(function(req, res, next) {
    console.log('첫 번째 미들웨어에서 요청을 처리함.');

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.end('<h1>Express 서버에서 응답한 결과 입니다.</h1>');
});

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스로 웹서버 실행함 : ' + app.get('port'));
});
