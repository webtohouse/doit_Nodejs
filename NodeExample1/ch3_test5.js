var Person = {};

Person.name = '홍길동';
Person['age'] = 100000;
Person.add = function(a, b){
    return a+b;
}


var result = Person.add(10,10);

console.dir(Person);
console.log(result);
