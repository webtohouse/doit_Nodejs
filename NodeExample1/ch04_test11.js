// 스트림 단위로 파일 읽고 쓰기

/* 파일을 읽거나 쓸 때 데이터 단위가 아닌 스트림 단위로 처리할 수 있는데.
* 스트림(데이터가 전달되는 통로) 객체를 만든 후 데이터를 읽고 쓰게 된다.
* 파일에서 읽을 때 createReadStream()
* 파일에 쓸 때 : createWriteStream()
* 옵션 : flags, encoding, autoClose 속성이 들어 있는 자바스크립트 객체를 전달 할 수 있다.
*
* 두 개의 스트림을 붙일 때 : pipe()
* 이전 파일 삭제 : unlink()
*/

// output.txt 파일의 내용을 읽어 들인 후 output2.txt 파일로 쓰는 예.
var fs = require('fs');

var infile = fs.createReadStream('./output.txt', {flags: 'r'});
var outfile = fs.createWriteStream('./output2.txt', {flags: 'w'});

infile.on('data', function(data) {
    console.log('읽어 들인 데이터 : ' + data);
    outfile.write(data);
});

infile.on('end', function() {
    console.log('파일 읽기 종료');
    outfile.end(function() {
        console.log('파일 쓰기 종료');
    });
});
