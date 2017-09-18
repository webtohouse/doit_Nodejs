var express = require('express');
var http = require('http');

var app = express(); // express 서버 객체

// 속성설정
app.set('port', process.env.PORT || 3000);
app.set('views',__dirname + '/views');
app.set('wiew engine', 'jade');

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스로 웹서버 실행함 : ' + app.get('port'));
});
