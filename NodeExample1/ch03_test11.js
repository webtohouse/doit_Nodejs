// 배열에 값 추가 및 삭제하기

// 배열의 끝에 요소를 추가하거나 제거할 때 push(), pop()을 사용.

var Users = [
    {name: '소녀시대', age: 20},
    {name: '걸스데이', age: 22}
];

Users.push( {name: '티아라', age: 23});

console.log('push() 배열 끝에 요소 추가 :' + Users.length + Users[2].name);

Users.pop();
console.log('pop() 배열 끝에 요소 삭제 :' + Users.length);
