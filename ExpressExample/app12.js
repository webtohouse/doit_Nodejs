// 쿠키와 세션 관리하기
// 2. 세션 처리하기

var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

// 오류 핸들러 모듈 사용
// var expressErrorHandler = require('express-error-handler');

// cookie-parser 모듈 로딩
var cookieParser = require('cookie-parser');

// express-session 모듈 로딩
var expressSession = require('express-session');

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

// express-session 미들웨어 설정
app.use(expressSession({
    secret: 'my sessionKey',
    resave: true,
    saveUninitialized: true
}));


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

// 상품정보 요청 path 라우팅 함수
app.get('/process/product', function(req, res) {
    var requestPath = req.path;
    console.log(requestPath + '호출됨.');

    if(req.session.user) {
        res.redirect('/product.html');
    } else {
        res.redirect('/login2.html');
    }
});

// 로그인
app.post('/process/login', function(req, res) {
    var requestPath = req.path;
    console.log(requestPath + '호출됨.');

    var paramid = req.body.id;
    var paramPassword = req.body.password;

    if(req.session.user) {
        // 이미 로그인된 상태
        console.log('이미 로그인되어 상품 페이지로 이동 합니다.')
        res.redirect('/product.html');
    } else {
        // 세션 저장
        req.session.user = {
            id: paramid,
            name: '홍길동',
            authorized: true
        };
    }

    res.writeHead('200', {'Content-Type':'text/html;charset=utf=8'});
    res.write('<h1>로그인 성공!!.</h1>');
    res.write("<img src='/images/login.png' width='100'>");

    res.write('<div><p>Param ID : ' + paramid + '</p></div>');
    res.write('<div><p>Param PASSWORD : ' + paramPassword + '</p></div>');
    res.write('<div><a href="/process/product">상품페이지로 이동하기</a></div>');
    res.end();
});

// 로그아웃
app.get('/process/logout', function(req, res) {
    var requestPath = req.path;
    console.log(requestPath + '호출됨.');

    if(req.session.user) {
        // 로그인된 상태
        console.log('로그아웃 합니다.');

        // session delete
        req.session.destroy(function(err) {
            if(err) {
                console.log(err);
            }
            console.log('세션을 삭제하고 로그아웃 되었습니다.');
            res.redirect('/login2.html');
        });
    } else {
        // 로그인 안된 상태
        console.log('로그인하세요!!');
        res.redirect('/login2.html');
    }
});
