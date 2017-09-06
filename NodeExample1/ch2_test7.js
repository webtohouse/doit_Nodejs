var os = require('os');

console.log('hostname : %s', os.hostname());
console.log('memory : %d / %d', os.freemem(), os.totalmem());
console.log('CPU : \n');
console.log(os.cpus());
console.log('network interface : \n');
console.log(os.networkInterfaces());
