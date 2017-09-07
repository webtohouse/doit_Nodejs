// 배열에 값 추가 및 삭제하기

// 배열의 앞에 요소를 추가하거나 제거할 때 unshift(), shift()을 사용.

var Users = [
    {name: '소녀시대', age: 20},
    {name: '걸스데이', age: 22}
];

console.log('요소추가 전' + Users.length);
console.dir(Users);

Users.unshift( {name: '티아라', age: 23});

console.log('unshift() 배열 앞에 요소 추가 :' + Users.length);
console.dir(Users);

Users.shift();
console.log('shift() 배열 앞에 요소 삭제 :' + Users.length);
console.dir(Users);
