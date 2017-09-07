var Calc = require('./calc3');

var calc1 = new Calc();
console.log('Calc 에 stop 이벤트 전달함.');
calc1.emit('stop'); // 이벤트 전달.


var result = calc1.add( 10, 10 );
console.log(result);
