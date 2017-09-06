var Person = {};

Person['age'] = 20;
Person['name'] = '소녀시대';
Person.mobile = '010-1233-3212';

console.dir(Person);

console.log('이름 : ', Person.name);
console.log('나이 : ', Person.age);
console.log('전화 : ', Person['mobile']);
