// js 面试题集合

// 实现以下功能
// var addSix = createBase(6);
// addSix(10); // returns 16
// addSix(21); // returns 27

// function createBase(baseNum){
//   var foo = (addNum) => {
//     return baseNum + addNum
//   }
//   return foo
// }

function createBase(baseNum) {
  const foo = (addNum) => {
    return baseNum + addNum
  }
  return foo
}

const addSix = createBase(6);
// console.log(addSix);
// console.log(addSix(10)); // 16

// 判断一个数书否为整数

// 除以1取余数 若存在余数则不是整数
function fucOne(num) {
  return !(num % 1)
}
// console.log(fucOne(12)); // true
// console.log(fucOne(12.34)); // false
// console.log(fucOne(12.0)); // true

// 直接取整 然后与原值比较是否相等

function fucTwo(num) {
  return parseInt(num) === num
}
// console.log('========方法二==========');
// console.log(fucTwo(12.0)); // true
// console.log(fucTwo(12.23)); // false

const a = {a: 12};
const b = {a: 12};
// console.log(a);
// console.log(b);
// console.log( a == b);
// console.log(JSON.stringify(a));
// console.log(JSON.stringify(b));
// console.log(JSON.stringify(a) == JSON.stringify(b));

const maxNum = Math.max(...[3,1,5,34]);
// console.log(maxNum);

const ary = [1,2,3,2,1,4,5];
const eventObj = {};
for(let i = 0; i < ary.length; i++) {
  // 块级作用域
  eventObj[i] = function () {
    console.log(i);
  }
}
var test1 = 'this is a prop';
const foo = () => {
  // this 指向window
  console.log(this.maxNum);
}

function foo1() {
  console.log(this);
}

// 问题三
function changeNum(num) {
  const nums = (num + '').split('.');
  const strings = [];
  for (let i = Math.ceil( nums[0].length / 3) ; i > 0 ; i--){
    // 获取后三位
    strings.push(nums[0].substr(-3 * i, 3));
  }
  console.log(strings.join());
  console.log(`${strings.join()}.${nums[1]}`);
}
// 实现数组的随机排序
// 方法一
function sortData (num) {
  return num.sort(() => Math.random() - .5);
}

// 方法二
function sortData1(num) {
  const index = [];
  for(let i = num.length; i > 0; i-- ){
    // 产生 [0,i)随机数
    const n = Math.floor(Math.random()*i);
    index.push(num.splice(n, 1)[0]);
  }
  console.log(index);
}

// js继承
function Animal(){
  this.categories = 'animal';
}

// 利用构造函数 prototype
// function Cat({name, age}) {
//   this.name = name;
//   this.age = age
// }
// Cat.prototype = new Animal();
// // 否则 constuctor 属性丢失
// Cat.prototype.constuctor = Cat;
// const miao = new Cat({name: '哼哼', age: 2})


// 使用 call apply绑定

function Cat({name, age} = {name: '哼哼', age: 2}){
  Animal.call(this);
  this.name = name;
  this.age = age;
}

const miao = new Cat();
console.log(miao);
