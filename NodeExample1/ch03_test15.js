// 콜백 함수 이해하기


// 함수를 호출했을 때 또 다른 함수를 파라미터로 전달하는 방법.
function add(a, b, callback) {
    var result = a + b;
    callback(result);
}

add(10, 10, function(result) {
    console.log('파라미터로 전달된 콜백 함수 호출됨.');
    console.log('더하기 (10, 10)의 결과 : ' + result);
});
