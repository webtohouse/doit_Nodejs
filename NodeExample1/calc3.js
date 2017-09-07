
const EventEmitter = require('events').EventEmitter;
const util = require('util');

var Calc = function() {
    this.on('stop', function() {
        console.log('Calc 에 stop 이벤트 전달됨.');
    });
};

util.inherits(Calc, EventEmitter);

Calc.prototype.add = function (a, b) {
    return a + b;
};

module.exports = Calc;
module.exports.title = 'calculator';
