var fs = require('fs');

// 파일을 비동기식으로 데이터를 씁니다.
// 메소드 형식 : wirteFile(filename, data, encoding='utf8', [callback])

fs.writeFile('./README.md','Hello Nodejs!!', function(err) {
    if(err) {
        console.log(' 파일 쓰기 실패!!')
    }
    console.log('파일 쓰기 성공!!');
});

fs.readFile('./README.md', 'utf8', function(err, data){
    if(err){
        console.log('파일 읽기 실해!!')
    }
    console.log('파일 읽기 성공!!');
    console.log(typeof(data));
    console.dir(data);
});


// fs.writeFile('./Hello.txt', 'Hello Nodejs!!!', function(err){
//     if(err) {
//         console.log('파일쓰기 실패!!');
//     }
//     console.log('Hello.txt 파일 쓰기 완료!');
// });
