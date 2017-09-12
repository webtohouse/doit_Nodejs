// 파일을 직접 열고 닫으면서 읽거나 쓰기

/*
* open(path, flags, mode, callback) : 파일 일기
* read(fd, buffer,, offset, length, position, callback) : 지정한 부분의 파일 내용을 읽어 들임.
* write(fd, buffer, offset, length, postion, callback) : 파일의 지정한 부분에 데이터를 씀.
* close(fd, callback) ; 파일을 닫아 줌.
*/

var fs = require('fs');

// 파일열기
fs.open('./Hello2.txt', 'w', function(err, fd) {

    console.log('파일 open 성공!!');
    console.dir(fd);

    if(err) {
        console.log('open() 실패!!!');
        console.dir(err);
    }
    // 파일쓰기
    var buf = new Buffer('안녕!\n');
    fs.write(fd, buf, 0, buf.length, null, function(err, written, buffer) {
        console.dir(written);
        if(err) {
            console.log('파일 쓰기 실패!!!');
            console.dir(err);
        }
        console.log('파일 쓰기 성공!!');

        // 쓰고닫기
        fs.close(fd, function() {
            console.log('파일 닫기 완료.');
        });
    });
});
