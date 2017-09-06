var path = require('path');

// 디렉터리 이름 합치기
var directories = ['users', 'mike', 'docs'];
var docDirectory = directories.join(path.sep);

console.log('문서 디렉터리 : %s', docDirectory);

// 디렉터리 이름과 파일 이름 합치기
var curPath = path.join('/Users/mike', 'notepad.exe');
console.log('파일 패스 : %s', curPath);



// path에서 디렉터리, 파일 이름, 확장자 구별하기
var filename = curPath;
var dirname = path.dirname(filename);
var basename = path.basename(filename);
var extname = path.extname(filename);

console.log('디렉터리 : %s, 파일이름 : %s, 확장자 : %s', dirname, basename, extname);
