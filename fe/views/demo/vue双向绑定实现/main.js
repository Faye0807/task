// 数据双向绑定的根本原理

const a = {a: '2'};
// Object.defineProperty(a, 'a', {
//   get: () => {console.log('get a '); return 'propA'},
//   set: (newval) => {console.log('set a ', newval);}
// });

// 监听器
function Observer(data) {
  if ( !data || typeof data !== 'object') return;
  Object.keys(data).forEach((key) => {
    defineReactive(data, key, data[key]);
  });
}

function defineReactive(data, key, value) {
  // 注意：value 不可以使用data[key],因为这样会调用下面的get函数
  // 遍历子属性
  Observer(value);
  var dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      // Compile方法调用 watch时候会添加
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      console.log(`get${key}`)
      return value
    },
    set: (newVal) => {
      if (newVal === value) return;
      value = newVal;
      console.log(`${key}: ${newVal}`);
      // 数据如果变化，通知所有订阅者
      dep.notify();
    }
  });
}
Dep.target = null;

// dep：主要负责收集订阅者，在属性变化的时候执行对应订阅者的更新函数
function Dep() {
  this.subs = [];
}
Dep.prototype.addSub = function(sub) {
  this.subs.push(sub);
}
Dep.prototype.notify = function() {
  this.subs.forEach((sub) => {
    sub.update();
  })
}

// 订阅者 Watcher
function Watcher(vm, exp, cb) {
  // vm vue实例
  this.vm = vm;
  // 属性名
  this.exp = exp;
  // 属性更改 对应的更新函数
  this.cb = cb;
  // 在初始化的时候 从get方法获取值（且只有初始化的时候会调用get方法）；保留初始值以备run方法使用
  this.value = this.get();
}
Watcher.prototype = {
  update: function() {
    this.run()
  },
  run: function() {
    var value = this.vm.data[this.exp];
    var oldValue = this.value;
    console.log('run');
    if (value !== oldValue) {
      this.value = value;
      this.cb.call(this.vm, value, oldValue);
    }
  },
  get: function() {
    Dep.target = this;
    // 获取属性，所以这一句会调用get方法；get方法会使用Dep.target做判断
    var value = this.vm.data[this.exp];
    Dep.target = null;
    return value;
  }
};

// 实现 Compile（解析dom节点）
// vm selfVue实例
function Compile(el, vm) {
  this.vm = vm;
  this.compileEle(document.querySelector(el));
}
Compile.prototype = {
  updateElement(node, value) {
    node.nodeValue = typeof value !== undefined ? value : '';
  },
  compileEle(node) {
    var childNodes = node.childNodes;
    var reg = /^\{\{(.*)\}\}$/;
    var v_Reg = /^v-(.*)$/;
    childNodes.forEach((node) => {
      // 文本节点
      if (node.nodeType === 3 && reg.test(node.nodeValue)){
        console.log(node);
        var prop = reg.exec(node.nodeValue)[1];
        // var innerText = this[prop];
        this.updateElement(node, this.vm[prop]);
        new Watcher(this.vm, prop, (value) => {
          this.updateElement(node, value);
        })
      } else if (node.nodeType === 1 && node.attributes.length) {
        // 如果是元素节点，且属性个数》0
        var attr = node.attributes;
        Array.prototype.forEach.call(attr, (item) => {
          if (v_Reg.test(item.name)) {
            var exp = item.nodeValue;
            console.log(attr);
            node.value = this.vm[exp];
            new Watcher(this.vm, exp, function(value) {
              node.value = value;
            });
            node.oninput = (e) => {
              if (this.vm.value !== e.target.value) {
                this.vm[exp] = e.target.value;
              }
            }
          }
        })
      }
      if (node.childNodes && node.childNodes.length) {
        this.compileEle(node);
      }
    })
  }
}

// function SelfVue(data, el, exp) {
//   this.data = data;
//   Object.keys(data).forEach((key) => {
//     this.proxyKeys(key);
//   })
//   Observer(data);
//   el.innerHTML = this.data[exp];
//   new Watcher(this, exp, function(value) {
//     el.innerHTML = value;
//   });
//   return this;
// }

function SelfVue(options) {
  this.vm = this;
  this.data = options.data;
  Object.keys(this.data).forEach((key) => {
    this.proxyKeys(key);
  });
  Observer(this.data);
  new Compile(options.el, this);
}

// 将selfVue.data 代理到selfVue
// 这样就可以直接使用 selfVue.name访问name属性
SelfVue.prototype = {
  proxyKeys: function(key) {
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: true,
      get: function() {
        return this.data[key]
      },
      set: function(newVal) {
        this.data[key] = newVal;
      }
    })
  }
}


var vue = new SelfVue({
  el: '#app',
  data: {
    name: 'myname',
    inputValue: 'input'
  }
})