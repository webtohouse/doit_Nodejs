// 사용모듈
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var static = require('serve-static');
var path = require('path');

var app = express();

app.use(bodyParser.urlencoded( { extended: true}));
app.use(bodyParser.json());

app.use(static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    var callpath = req.path;
    console.log(callpath + '요청함');
    res.redirect('/myMeomo.html');
});

app.post('/mymemo/insert', function(req, res) {
    var callpath = req.path;
    var writer = req.body.writer;
    var writedate = req.body.writedate;
    var contents = req.body.contents;
    console.log(callpath + '요청함');

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>나의메모</h1>');
    res.write('<p>작성자 : ' + writer + '</p>');
    res.write('<p>작성일 : ' + writedate + '</p>');
    res.write('<p>내용 : ' + contents + '</p>');

    res.write('<p>메모가 저장되었습니다.</p>');
    res.write('<hr>');
    res.write('<form action="/rewrite">');
    res.write('<input type="submit" value="다시작성">');
    res.write('</form>');
    res.end();
});

app.get('/rewrite', function(req, res) {
    var callpath = req.path;
    console.log(callpath + '요청함');
    res.redirect('/myMeomo.html');
});

app.set('port', process.env.PORT || 3000);
http.createServer(app).listen(app.get('port'), function() {
    console.log('서버실행' + app.get('port'));
});

app.all('*', function(req, res) {
    res.send(404, '<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
});
