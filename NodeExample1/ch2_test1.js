var result = 0;

console.time('duration_sum');

for(var i = 1; i <= 1000; i++){
    result += i;
}

console.timeEnd('duration_sum');
console.log('1 부터 1000 까지 더한 결과물 : %d', result);

// 현재 실행한 파일 이름
console.log('현재 실행한 파일의 이름 : %s', __filename);

// 현재 실행한 파일의 경로
console.log('현재 실행한 파일의 경로 : %s', __dirname);


var Person = {name: "소녀시대", age:20};
console.dir(Person);
console.log(Person);
