// 프로토타입 객체 만들기

// 일반 객체생성
var person1 = {name:'소녀시대', age: 22};
var person2 = {name:'걸스데이', age: 25};

// 프로톹타입 객체 생성

function Person(name, age){
    this.name = name;
    this.age = age;
}

Person.prototype.walk = function(speed) {
    console.log(this.name + ':' + speed + 'km 속도로 달려 갑니다.');
};

Person.prototype.speed = function (speed, walk) {
    console.log(this.name + ':' + speed + 'km 속도로 달리고' + walk + 'km 속도로 걸어요')
};

var person3 = new Person('티아라', 20);
var person4 = new Person('마징가', 50);


person3.walk(10);
person3.speed(20, 6);
