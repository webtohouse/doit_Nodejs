// Buffer 객체 사용하는 방법 알아보기
// Buffer 객체는 바이너리 데이터를 읽고 쓰는 데 사용.

/*
* isBuffer() : 변수에 들어 있는 것이 버퍼 객체인지 아닌지 확인
* copy() : 하나의 버퍼 객체를 다른 버퍼 객체로 복사할 때
* concat() : 두개의 버퍼를 하나로 붙혀서 새로웅ㄴ 버퍼 객체를 만들 때
* write() : 문자열을 버퍼에 쓰거나 new Buffer('안녕...!', 'utf8'); 형태로 처음부터 문자열을 사용해 버퍼 객체를 생성.
*/

// 버퍼 객체를 크기만 지정하여 만든 후 문자열을 씁니다.
var output = '안녕 1!';
var buffer1 = new Buffer(10);
var len = buffer1.write(output, 'utf8');
console.log('첫 번째 버퍼의 문자열 : ' + buffer1.toString());

// 버퍼 객체를 문자열을 이용해 만듭니다.
var buffer2 = new Buffer('안녕 2!', 'utf8');
console.log('두 번째 버퍼의 문자열 : ' + buffer2.toString());

// 타입을 확인 합니다.
console.log('버퍼 객체의 타입 : ' + Buffer.isBuffer(buffer1)); // true

// 버퍼 객체에 들어있는 문자열 데이터를 문자열 변수로 만듭니다.
var bytesLen = Buffer.byteLength(output);
console.log(bytesLen);

var str1 = buffer1.toString('utf8', 0, bytesLen);
var str2 = buffer2.toString('utf8');


// 첫 번째 버퍼 객체의 문자열을 두 번째 버퍼 객체로 복사 합니다.
buffer1.copy(buffer2, 0, 0, len);
console.log('두 번째 버퍼에 복사한 후의 문자열 : ' + buffer2.toString('utf8'));

// 두 개의 버퍼를 붙여 줍니다.
var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log('두 개의 버퍼를 붙인 후의 문자열 : ' + buffer3.toString('utf8'));
