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

// fs 모듈로 새 디렉터리 만들고 삭제하기

var fs = require('fs');
fs.mkdir('./docs', 0666, function(err) {
    if(err) {
        console.log('폴더 만들기 실패!!');
    }

    console.log('새 폴더 만들기 성공!!');

    fs.rmdir('./docs', function(err) {
        if(err) {
            console.log('폴더 삭제 실패!');
        }

        console.log('폴더가 삭제 되었습니다.');
    });
});
