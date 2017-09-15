
var http = require('http');

// 클라이언트의 요청을 처리하는 콜백 함스를 파라미터로 전달합니다.
var server = http.createServer(function(req, res) {
    console.log('클라이언트 요청이 들어왔습니다.');
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write(" <head>");
    res.write("     <title>응답 페이지</title>");
    res.write(" </head>");
    res.write(" <body>");
    res.write("     <h1>새로운 응답 페이지</h1>");
    res.write(" </body>");
    res.write("</html>");
    res.end();
});

var port = 3000;
server.listen(port);
