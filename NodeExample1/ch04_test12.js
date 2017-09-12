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

// 두 개의 스트림을 붙여보자!
// pipe() 이용.
// ReadStream, WriteStream 타입의 객체를 붙여주면 스트림 간에 데이터를 알아서 전달 함.

var fs = require('fs');

var inname = './output.txt';
var outname = './output2.txt';

fs.exists(outname, function(exists) {
    if(exists) {
        fs.unlink(outname, function(err) {
            if(err) {
                console.log('기존 파일 삭제 실패!!');
            }
            console.log('기존파일 [' + outname + '] 삭제함.');
        });
    }

    var infile = fs.createReadStream(inname, {flags: 'r'});
    var outfile = fs.createWriteStream(outname, {flags: 'w'});

    infile.pipe(outfile);
    console.log('파일 복사 [' + inname + '] ->' + '[' + outname + ']');
});
