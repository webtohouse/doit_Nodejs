// 미들웨어 사용하기

/*
* static 미들웨어
* - 특정 폴더의 파일들을 특정 패스로 접근할 수 있도록 만들어 준다.
* - 예들들어 public 폴더에 있는 모든 파일을 웹 서버의 루트 패스로 접근할 수 있도록 만들고 싶다면?
* - app.use(express.static(path.join(__dirname, 'public')));
* - public 폴더 안에 있는 파일을 사이트 /public 패스로 접근하도록 만들고 싶다면 static() 호출시 아래와 같이 패스를 지정.
* - app.use('/public', express.static(path.join(__dirname, 'public')));
*
* body-parser
* - 클이언트가 POST 방식으로 요청했을 때 요청 파라미터를 확인할 수 있는 미들웨어
* - POST 방식으로 요청할 때는 본문 영역(Body 영역)에 요청 파라미터가 들어 있어 파라미터 파싱 방법이 GET방식(주소 문자열에 요청 파라미터가 들어감.)과 다르다.
*
*/

var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

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

var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(function(req, res, next) {

    // get 요청시
    // var paramid = req.params.id;
    // var paramPassword = req.params.password;

    // POST 요청시 같은 결과를 보여 줍니다.
    // var paramid = req.param('id');
    // var paramPassword = req.param('password');
    var paramid = req.body.id;
    var paramPassword = req.body.password;

    console.log('첫 번째 미들웨어에서 요청을 처리함.');

    res.writeHead('200', {'Content-Type':'text/html;charset=utf=8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    // res.write('<img src="/images/umbrella.png">');
    res.write("<img src='/images/umbrella.png' width='100'>");

    res.write('<div><p>Param ID : ' + paramid + '</p></div>');
    res.write('<div><p>Param PASSWORD : ' + paramPassword + '</p></div>');
    res.end();
});
