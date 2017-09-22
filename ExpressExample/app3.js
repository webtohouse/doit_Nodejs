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
    req.user = 'mike';
    req.person = {name: '소녀시대', age: 20};
    next(); // 두 번째 미들웨어가 처리 할 수 있도록 반드시 next() 메소드를 호출하여 다음 미들웨어로 처리 순서를 넘겨준다.
});

app.use('/', function(req, res, next) {
    console.log('두 번째 미들웨어에서 요청을 처리함.');

    // javascript 객체를 json 문자열로 변경
    // var person = {name: '소녀시대', age: 20};
    var personObj = req.person;
    var personStr = JSON.stringify(personObj);

    // javascript 객제를 바로 전달.
    // res.send(person);

    // json 문자열로 전달.
    // res.send(personStr);
    console.log(typeof(personObj));
    console.log(personObj);
    console.log(typeof(personStr));
    console.log(personStr);

    res.writeHead('200', {'Content-Type':'application/json;charset=utf8'});
    res.write(personStr + '\n' + req.user);
    res.end();
});

// app.use('/', function(req, res, next) {
//     console.log('두 번째 미들웨어에서 요청을 처리함.');
//
//     res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
//     res.end('<h1>Express 서버에서 ' + req.user + '가 응답한 결과 입니다.</h1>');
// });

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스로 웹서버 실행함 : ' + app.get('port'));
});
