// express-error-handler 미들웨어로 오류 페이지 처리하기

/*
* 라우터 미들웨어 사용하기
* get(path, callback) : GET 방식으로 특정 패스 요청이 발생했을 때 사용할 콜백 함수를 지정.
* post(path, callback) : POST 방식으로 특정 패스 요청이 발생했을 때 사용할  콜백 함수를 지정.
* put(path, callback) : PUT 방식으로 특정 패스 요청이 발생했을 때 사용할 콜백 함수를 지정.
* delete(path, callback) : DELETE 방식으로 특정 패스 요청이 발생했을 때 사용할 콜백 함수를 지정.
* all(path, callback) : 모든 요청 방식을 처리하며, 특정 패스 요청이 발생했을 때 사용할 콜백 함수를 지정.
*/

var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

// 오류 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

var app = express(); // express 서버 객체
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

// POST 방식의 특정 path 요청처리.
app.post('/process/login', function(req, res) {

    var requestPath = req.path; // 요청 path 확인
    var paramid = req.body.id;
    var paramPassword = req.body.password;

    console.log(requestPath + ' 요청을 처리함.');
    res.writeHead('200', {'Content-Type':'text/html;charset=utf=8'});
    res.write('<h1>로그인 성공!!.</h1>');
    res.write("<img src='/images/login.png' width='100'>");

    res.write('<div><p>Param ID : ' + paramid + '</p></div>');
    res.write('<div><p>Param PASSWORD : ' + paramPassword + '</p></div>');
    res.end();
});

// 라우터로 설정된 이외의 path로 접근 했을 때 처리.
// app.all('*', function(req, res) {
//     res.send(404, '<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
// });

// 모든 router 처리 끝난 후 404 오류 페이지 처리
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);
