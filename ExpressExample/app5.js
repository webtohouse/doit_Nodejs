// redirect() 메소드로 무조건 다른 페이지로 이동하기

/*
* send() : 클라이언트애 응답 데이터를 보낸다. 전달할 수 있는 데이터는 HTML 문자열, Buffer 객체, JSON 객체, JSON 배열
* status(code) : HTTP 상태 코드를 반환 상태 코드는 end(), send() 같은 전송 메소드를 추가로 호출해야 전송할 수 있다.
* sendStatus(statusCode) : HTTP 상태 코드를 반환. 상태 코드는 상태 메시지와 함께 전동됨.
* redirect([status], path) : 웹페이지 경로를 강제로 이동시킨다.
* render(view, [locals], [callback]) : 뷰 엔진을 사용해 HTML 문서를 만든 후 전송.
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

    res.redirect('http://google.co.kr');

});

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스로 웹서버 실행함 : ' + app.get('port'));
});
