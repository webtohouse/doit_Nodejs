// 이벤트 이해하기
/*
* on(event,listener) : 지정한 이벤트의 리스너를 추가합니다.
* once(event, listener) : 지정한 이벤트의 리스너를 추가하지만 한 번 실행한 후에는 자동으로 리스너가 제거 됩니다.
* removeListener(event, listener) : 지정한 이벤트에 대한 리스너를 제거합니다.
*/

process.on('exit', function() {
    console.log('exit 이벤트 발생함.');
});

setTimeout(function() {
    console.log('2초 후에 실행되었음.');
    process.exit(); // 프로세스를 끝내는 메소스
}, 2000);

console.log('2초 후에 실행될 것임.');
console.log(process.env); // 환경 변수 정보
console.log(process.argv); // 프로세스를 실행할때 전달되는 파리미터 정보
console.log(process.uptime()); // 현재 프로그램의 실행된 시간
console.log(process.arch); // 프로세서의 아키텍처
console.log(process.version); // Nodejs version
console.log(process.memoryUsage()); // 메모리 사용정보를 가진 객체

console.log(process.argv.length);

process.argv.forEach(function(item, index) {
    console.log('# :' + index + ' item :' + item);
});
