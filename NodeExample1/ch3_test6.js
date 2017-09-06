
var Person = {};

Person.name = '홍길동';
Person['age'] = 100000;

var add = function(a, b){
    return a + b;
}

Person['add'] = add;

var result = Person.add(10,10);

console.dir(Person);
console.log(result);
