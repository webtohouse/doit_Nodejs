// for 문을 이요한 배열의 모든 요소 하나씩 확인하기

var Users = [
    { name: '홍길동', age: 3000 },
    {name: '이순신', age: 100},
    {name: '진시황', age: 1000}
];
console.log('for문 사용');
for(var i = 0; i < Users.length; i++){
    console.log('index:' + i + ' name: ' + Users[i].name +', age:' + Users[i].age);
}

console.log(' ');

// forEach() 메소드를 이용한 배열의 요소에 접근하기
console.log('forEach 구문 사용');
Users.forEach(function(item, index){
    console.log('index: ' + index + ' name:' + item.name +', age:' + item.age);
});
