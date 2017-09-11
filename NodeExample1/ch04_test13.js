// 스트림 단위로 파일 읽고 쓰기

/* 파일을 읽거나 쓸 때 데이터 단위가 아닌 스트림 단위로 처리할 수 있는데.
* 스트림(데이터가 전달되는 통로) 객체를 만든 후 데이터를 읽고 쓰게 된다.
* 파일에서 읽을 때 createReadStream()
* 파일에 쓸 때 : createWriteStream()
* 옵션 : flags, encoding, autoClose 속성이 들어 있는 자바스크립트 객체를 전달 할 수 있다.
*
* 두 개의 스트림을 연결할 때 : pipe()
* 이전 파일 삭제 : unlink()
*/

// http 모듈로 요청받은 파일 내용을 읽고 응답하기
// http 모듈을 사용해 사용자로 부터 요청을 받았을 때 파일의 내용을 읽어 응답하는 예

var fs = require('fs');
var http = require('http');

var server = http.createServer(function(req, res) {
    // 파일을 읽어 응답 스트림과 pipe()로 연결합니다.
    var instream = fs.createReadStream('./output.txt');
    instream.pipe(res);
});

server.listen(7001, '127.0.0.1');
