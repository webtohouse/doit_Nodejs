// 배열에 값 추가 및 삭제하기

// 배열의 중간 요소를 제거할 때 delete 키워드 사용.
// delete 키워드로 배열을 삭제하면 객체만 삭제되고 공간은 그대로 남아있다.

var Users = [
    {name: '소녀시대', age: 20},
    {name: '걸스데이', age: 22},
    {name: '티아라', age: 23}
];

console.log('배열 요소 삭제 전 배열 수 :' + Users.length); // index: 3
console.dir(Users);

delete Users[1]; // 배열 요소 삭제

console.log('delete 키워드로 배열 요소 삭제 후 :' + Users.length); // index: 3
console.dir(Users);

console.log('');
// splice()메소드로 배열 요소 여러 개를 한꺼번에 추가하거나 삭제하기

var Users2 = [
    {name: '소녀시대', age: 20},
    {name: '걸스데이', age: 22},
    {name: '티아라', age: 23}
];
console.log('원본 Users2');
console.dir(Users2);
console.log('');
Users2.splice(1, 0, {name: '세종대왕', age: 2000},{name: '이순신', age: 1000});
console.log('splice()로 요소를 인덱스 1에 추가한 후');
console.dir(Users2);
console.log('');
Users2.splice(2, 1);
console.log('splice()로 인덱스 2의 요소를 1개 삭제한 후');
console.dir(Users2);
