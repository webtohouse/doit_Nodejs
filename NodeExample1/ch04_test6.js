var fs = require('fs');

// 파일을 비동기식 IO로 읽어 들이기.

fs.readFile('./README.md', 'utf8', function(err, data) {
    console.log('파일을 비동기식으로 읽어옮.');
    console.log(data);
});

console.log('프로젝트 폴더 안의 README.md 파일을 읽도록 요청 했습니다.');
