// 쿠키와 세션 관리하기
// 1. 쿠키 처리하기

var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

// 오류 핸들러 모듈 사용
// var expressErrorHandler = require('express-error-handler');

// cookie-parser 모듈 로딩
var cookieParser = require('cookie-parser');

// express 서버 객체
var app = express();

// 속성설정
app.set('port', process.env.PORT || 3000);

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스로 웹서버 실행함 : ' + app.get('port'));
});

// static 미들웨어 설정(특정 폴더의 파일들을 특정 패스로 접근할 수 있도록 만들어 줌.)
app.use(express.static(path.join(__dirname, 'public')));
/*
* Express 앱을 다른 디렉토리에서 실행하는 경우에는 다음과 같이 제공하기 원하는 디렉토리의 절대 경로를 사용하는 것이 더 안전
* public 폴더 안에 있는 파일을 /static 패스로 접근하도록 한다.
* app.use('/static', express.static(path.join(__dirname, 'public')));
*/

// body-parser 미들웨어 설정
app.use(bodyParser.urlencoded({extended: true}));

// cookie-parser 미들웨어 설정
app.use(cookieParser());

// // 모든 router 처리 끝난 후 404 오류 페이지 처리
// var errorHandler = expressErrorHandler({
//     static: {
//         '404': './public/404.html'
//     }
// });
//
// // expressErrorHandler 미들웨어 설정
// app.use(expressErrorHandler.httpError(404));
// app.use(errorHandler);


// 쿠키 정보를 확인함.
app.get('/precess/showCookie', function(req, res) {
    var requestPath = req.path;
    console.log(requestPath + '호출됨.');

    res.send(req.cookies);
});

// 쿠키에 이름 정보를 설정함.
app.get('/process/setUserCookie', function(req, res) {
    var requestPath = req.path;
    console.log(requestPath + '호출됨.');

    // 쿠키 설정
    res.cookie('user', {
        id: 'webto',
        name: '홍길동',
        authorized: true
    });

    // redirect로 응답
    res.redirect('/precess/showCookie');
});
