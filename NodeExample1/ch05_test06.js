// 파일을 스트림으로 읽어 응답 보내기

var http = require('http');
var fs = require('fs');

var port = 3000;
var hostname = '127.0.0.1';

var server = http.createServer();
server.listen(port, hostname, function(req, res) {
    console.log('서버실행 : %s:%d', hostname, port);
});

// // 클라이언트 이벤트 처리
// server.on('request', function(req, res) {
//     console.log('클라이언트 요청이 들어옮');
//
//     var fileName = 'bicycle_PNG5391.png';
//     var infile = fs.createReadStream(fileName, {flags: 'r'});
//
//     // pipe()로 연결하여 알아서 처리하도록 설정하기.
//     infile.pipe(res);
// });

// 파일을 버퍼에 담아 두고 일부분만 읽어 응답 보내기
server.on('request', function(req, res) {
    console.log('클라이언트 요청이 들어왔습니다.');

    var fileName = 'house.png';
    var infile = fs.createReadStream(fileName, {flags: 'r'});
    var filelength = 0;
    var culength = 0;

    fs.stat(fileName, function(err, stats) {
        if(err) {
            console.log('여기 : %s',err);
        }
        filelength = stats.size;
    });

    // 헤더쓰기
    res.writeHead(200,{"Content-Type": "image/png"});

    // 파일 내용을 스트림에서 읽어 본문 쓰기
    infile.on('readable', function() {
        var chunk;
        while(null != (chunk = infile.read())) {
            console.log('읽어드린 데이터 크기 : %d 바이트', chunk.length);
            culength += chunk.length;
            res.write(chunk, 'utf8', function(err) {
                console.log('파일 부분 쓰기 완료 : %d, 파일크기 : %d', culength, filelength);
                if(culength >= filelength) {
                    // 응답 전송하기
                    res.end();
                }
            });
        }
    });
});
