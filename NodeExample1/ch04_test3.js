// 이벤트 이해하기
/*
* on(event,listener) : 지정한 이벤트의 리스너를 추가합니다.
* once(event, listener) : 지정한 이벤트의 리스너를 추가하지만 한 번 실행한 후에는 자동으로 리스너가 제거 됩니다.
* removeListener(event, listener) : 지정한 이벤트에 대한 리스너를 제거합니다.
*/

process.on('tick', function(count) {
    console.log('tick 이벤트 발생함.' + count);
});

setTimeout(function() {
    console.log('2초 후에 실행되었음.');
    process.emit('tick', '2');
}, 2000);
