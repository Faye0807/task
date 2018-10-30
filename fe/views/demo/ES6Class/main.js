// ES6 Class demo
class Animal {
  constructor() {
    this.isCanSpeake = true;
  }
  name() {
    return 'Animal'
  }
  sayHi() {
    console.log('Hi');
  }
}
// Class无法添加自己的属性，只可以添加方法；
// 添加属性仍使用ES5方法
Animal.prototype.props = 'props';

class Cat extends Animal{
  constructor() {
    // 调用父类的constructor函数，必须
    super();
    this.name = 'miaomiao';
    this.speak = 'miaomiao';
  }
}

const cat = new Cat();
const animal = new Animal();
// Cat {
//   isCanSpeake: true
//   name: "miaomiao"
//   speak: "miaomiao"
//   __proto__: Animal
//    constructor: class Cat
//    __proto__: Object
//      props: "props",
//      constructor: class Animal,
//      name: ƒ name(),
//      sayHi: ƒ sayHi()
//      __proto__: Object
// }


// Animal { 
//   isCanSpeake: true;
//   __proto__: {
//     props: "props",
//     constructor: class Animal,
//     name: ƒ name(),
//     sayHi: ƒ sayHi()
//     __proto__: Object
//   }
// }