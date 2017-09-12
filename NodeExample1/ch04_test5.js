var fs = require('fs');

// 파일을 동기식 IO로 읽어 들이기.

var data = fs.readFileSync('./README.md', 'utf8');

console.log(data);
console.log('파일을 동기식으로 읽어와요.')
