// 콜백 함수 이해하기


// 함수를 호출했을 때 또 다른 함수를 파라미터로 전달하는 방법.
function add(a, b, callback) {
    var result = a + b;
    callback(result);

    var history = function() {
        return a + '+' + b + '=' + result;
    };

    return history;
}

var add_history = add(10, 10, function(result) {
    console.log('add 함수를 실행한 결과 : ' + result);
});

console.log('결과값으로 받은 함수 실행 : ' + add_history());
