// 익스프레스에서 요청 객체에 추가한 메소드 알아보기

/*
* 익스프레스에서 추가로 사용할 수 있는 요청 객체의 메소드
* param(name) : 요청 파라미터를 확인.
* header(name) : 헤더를 확인.
*/

var express = require('express');
var http = require('http');

var app = express(); // express 서버 객체

// 속성설정
app.set('port', process.env.PORT || 3000);
// app.set('views',__dirname + '/views');
// app.set('wiew engine', 'jade');

// 미들웨어 설정
app.use(function(req, res, next) {
    console.log('첫 번째 미들웨어에서 요청을 처리함.');

    var userAgent = req.header('User-Agent');
    // var paramName = req.param('name');
    var paramName = req.query.name;

    res.writeHead('200', {'Content-Type':'text/html;charset=utf=8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>User-Agent : ' + userAgent + '</p></div>');
    res.write('<div><p>Param Name : ' + paramName + '</p></div>');
    res.end();
});

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스로 웹서버 실행함 : ' + app.get('port'));
});
