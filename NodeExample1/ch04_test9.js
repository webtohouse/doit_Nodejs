// 파일을 직접 열고 닫으면서 읽거나 쓰기

/*
* open(path, flags, mode, callback) : 파일 일기
* read(fd, buffer,, offset, length, position, callback) : 지정한 부분의 파일 내용을 읽어 들임.
* write(fd, buffer, offset, length, postion, callback) : 파일의 지정한 부분에 데이터를 씀.
* close(fd, callback) ; 파일을 닫아 줌.
*/

var fs = require('fs');

// 파일열기

fs.open('./Hello2.txt', 'r', function(err, fd) {

    if(err) {
        console.log('오픈 실패!!');
    }

    console.log('오픈 성공!!');

    // 파일 읽기
    var buf = new Buffer(10); // Buffer 문자들을 담아두는 그릇

    // 버퍼 타입 확인
    console.log('버퍼 티입 : ' + Buffer.isBuffer(buf));

    fs.read(fd, buf, 0, buf.length, null, function(err, bytesRead, buffer) {

        var inStr = buffer.toString('utf8', 0, bytesRead);
        console.log('파일에서 읽은 데이터 : ' + inStr);
        console.log(err, bytesRead, buffer);

        if(err) {
            console.log('파일 읽기 실패!!');
        }
        // 파일 닫기
        fs.close(fd, function(err) {
            if(err) {
                console.log('닫기 실패!!');
            }
        });
    });
});
