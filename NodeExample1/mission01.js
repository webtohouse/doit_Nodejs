// 파일의 내용을 한 줄씩 읽어 들여 화면에 출력하는 기능을 만들어 보세요.

// var fs = require('fs');
//
// fs.open('./user_info.txt', 'r', function(err, fd) {
//     if(err) throw err;
//
//     var buf = new Buffer(83);
//
//      fs.read(fd, buf, 0, buf.length, null, function(err, bytesRead, buffer) {
//         if(err) throw err;
//
//         var inStr = buffer.toString('utf8', 0, bytesRead);
//         var beforStr = inStr.split('\n');
//         console.log(typeof beforStr);
//         console.dir(beforStr);
//     });
// });

/**
 * 미션 1
 *
 * 파일의 내용을 한 줄씩 읽어들여 출력하는 기능

 * 외장모듈 : fs, readline
 * 읽어들일 파일 : customer.txt
 */


// fs 모듈 사용
var fs = require('fs');
var readline = require('readline');

// 한 줄씩 읽어들이는 함수 정의
function processFile(filename) {
    var instream = fs.createReadStream(filename); // 스트림 단위로 파일 읽기
    var reader = readline.createInterface(instream, process.stdout);

    var count = 0;

    // 한 줄씩 읽어들인 후에 발생하는 이벤트
    reader.on('line', function(line) {
        console.log('한 줄 읽음 : ' + line);

        count += 1;

        // 공백으로 구분
        var tokens = line.split(' ');

        if (tokens != undefined && tokens.length > 0) {
            console.log('#' + count + ' -> ' + tokens[0]);
        }
    });

    // 모두 읽어들였을 때 발생하는 이벤트
    reader.on('close', function(line) {
        console.log('파일을 모두 읽음.');
    });
}

// 함수 실행
var filename = './customer.txt';
processFile(filename);
