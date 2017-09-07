// 배열에 값 추가 및 삭제하기

// slice()는 배열의 일부 요소들을 복사하여 새로운 배열을 만들어 준다.

var Users = [
    {name: '소녀시대', age: 20},
    {name: '걸스데이', age: 22},
    {name: '티아라', age: 23},
    {name: '애프터스쿨', age: 25}
];

console.log('배열의 수 : ', Users.length);
console.log('원본 Users');
console.dir(Users);


var Users2 = Users.slice(2);

console.log('slice()로 잘라낸 후 Users2');
console.dir(Users2);

var Users3 = Users2.slice(1);

console.log('slice()로 잘라낸 후 Users3');
console.dir(Users3);
