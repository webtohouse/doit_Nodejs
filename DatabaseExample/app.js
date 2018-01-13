// Express 기본 모듈 불러오기
var express = require('express');
var http = require('http');
var path = require('path');

// Express 미들웨어 불러오기
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');

// cookie-parser 모듈 로딩
var cookieParser = require('cookie-parser');

// express-session 모듈 로딩
var expressSession = require('express-session');

// 에러 핸들러 모듈 불러오기
var expressErrorHandler = require('express-error-handler');

// mongodb 모듈 불러오기
var mongodb = require('mongodb');

// Express 서버객체 만들기
var app = express();

// 서버 변수 설정 및 static으로 public 폴더 설정
app.set('port', process.env.PORT || 3000);
app.use('/public', express.static(path.join(__dirname, 'public')));

// body-parser, cookie-parser, express-session 사용 설정
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// cookie-parser 미들웨어 설정
app.use(cookieParser());

// express-session 미들웨어 설정
app.use(expressSession({
    secret: 'my sessionKey',
    resave: true,
    saveUninitialized: true
}));

var router = express.Router();

app.use('/', router);

// 로그인 처리를 요청하는 패스에 라잍팅 추가하기
app.post('/process/login', function(req, res) {
    console.log(req.path + '호출됨');
    var paramId = req.body.id;
    var paramPassword = req.body.password;
    // var paramId = req.param('id');
    // var paramPassword = req.param('password');

    // console.log('아이디 : ' + paramid + ' 비밀번호 : ' + paramPassword);
    // res.writeHead('200', {'Content-Type':'text/html;charset=utf=8'});
    // res.write('<h1>로그인 성공!!.</h1>');
    //
    // res.write('<div><p>Param ID : ' + paramid + '</p></div>');
    // res.write('<div><p>Param PASSWORD : ' + paramPassword + '</p></div>');
    // res.end();

    if(database) {
        authUesr(database, paramId, paramPassword, function(err, docs) {
            if(err) {
                console.log('에러가 밸생되었습니다.');
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>에러발생</h1>');
                res.end();
                return;
            }

            if(docs) {
                console.dir(docs);

                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>로그인 성공</h1>');
                res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>');
                res.write('<div><p>사용자 이름 : ' + docs[0].name + '</p></div>');
                res.write('<div><p>사용자 나이 : ' + docs[0].age + '</p></div>');
                res.write("<br><br><a href='/public/login.html'>다시로그인하기</a>");
                res.end();
            } else {
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>로그인 실패</h1>');
                res.write('<div><p>사용자 아이디와 비밀번호를 다시 확인해 주세요.</p></div>');
                res.write("<br><br><a href='/public/login.html'>다시로그인하기</a>");
                res.end();
            }
        });
    } else {
        console.log('데이터베이스 연결안됨.')
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>데이터베이스 연결 실패</h1>');
        res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
        res.end();
    }
});

// 404오류 페이지 처리 설정
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/error_404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function() {
    console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

    // 데이터베이스 연결
    connectDB();
});


// 데이터베이스 연결
var database;

// 데이터베이스에 연결하고 응답 객체의 속성으로 db객체 추가
function connectDB() {
    // 데이터베이스 연결정보
    var databaseUrl = 'mongodb://127.0.0.1:27017/shopping';
    // 데이터베이스 연결
    mongodb.connect(databaseUrl, function(err, db) {

        if(err) throw err;

        console.log('데이터베이스에 연결되었습니다. :' + databaseUrl);
        // database 변수에 할당
        database = db;
    });
}

// 사용자 인증 함수
var authUesr = function(database, id, password, callback) {
    console.log('authUesr 호출됨' + id + ',' + password);
    // users 컬렉션 참조
    var users = database.collection('users'); //users 컬렉션 객체 참조.

    // ID, PASSWORD를 사용해 검색
    users.find({"id" : id, "password" : password}).toArray(function(err, docs) {
        if(err) {
            callback(err, null);
            return;
        }

        if(docs.length > 0) {
            console.log('아이디 [%s], 비밀번호 [%s]가 일치하는 사용자 찾음.', id, password);
            callback(null, docs);
        } else {
            console.log("일치하는 사용자를 찾지 못함.");
            callback(null, null);
        }
    });
}
