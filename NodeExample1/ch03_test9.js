// 배열 이해하기

var Users = [{ name: '홍길동', age: 3000 }, {name: '이순신', age: 100}];

var add = function(a, b){
    return a + b;
}

Users.push(add);

console.dir(Users);
console.log(Users.length); // 3
console.log(Users[2].name); // add
console.log(Users[2].age); // undefined
console.log(Users[2](10, 10)); // 20
