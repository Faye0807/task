function Scroller ({} = {scrollerOuter: document.querySelector('#scrollerOuter'),scrollerInner: document.querySelector('#scrollerInner') }) {
  this.scrollerInner = scrollerInner;
  this.scrollerOuter = scrollerOuter;
  // scrollerInner被隐藏的height
  this.scrollerInnerHeight = 0;
  // 滚动条dom节点
  this.scrollBar = '';
  this.scrollInnerBar = '';
  // move时起始clientY值
  this.startTop = '';
  // scrollerInner将被滑动的值
  this.transformY = 0;
  // 滚动条相关属性
  this.barOptions = {
    height: 30,
    transformY: 0, 
    opacity: 0
  };
  this.touchData = {
    startClientY: 0,
    startTime: 0,
    // endClienY即是最后一次的 startTop
    endClienY: 0,
    endTime: 0,
    v: 0,
    points: [],
  };
  this.init();
}
Scroller.prototype = {
  constructor: 'Scroller',
  init() {
    this.optionsUpdate();
    this.createScrollBar();
    this.scrollerOuter.appendChild(this.scrollBar);
    this.scrollerOuter.style = `-webkit-overflow-scrolling: touch;${this.scrollerOuter.style};position:absolute;width:100%;height:80%; margin-top: 10%`;
    this.scrollerOuter.addEventListener('touchstart', this.touchstart.bind(this), false)
    this.scrollerOuter.addEventListener('touchmove', this.touchmove.bind(this), false)
    this.scrollerOuter.addEventListener('touchend', this.touchend.bind(this), false)
    // this.scrollerOuter.addEventListener('click', ()=>{console.log('click', new Date().getTime())}, false)
  },
  createScrollBar() {
    this.scrollBar = document.createElement('div');
    this.scrollInnerBar = document.createElement('div');
    this.scrollBar.style = 'width: .8%;height:100%;position: absolute;right:.5%;top: 0;';
    this.scrollBar.appendChild(this.scrollInnerBar);
  },
  optionsUpdate() {
    // 加载第二页时，滚动条的高度变化，scrollinner被隐藏高度变化
    this.scrollerInnerHeight = this.scrollerInner.offsetHeight - this.scrollerOuter.offsetHeight;
    this.barOptions.height = (this.scrollerOuter.offsetHeight / (this.scrollerInner.offsetHeight)) * 100;
  },
  // 快速滑动时的惯性滑动
  inertiaBar() {
    if (this.touchData.points.length < 10) return;
    this.touchData.v = this.touchData.points[this.touchData.points.length-1].clientY - this.touchData.points[0].clientY;
    // console.log('v', this.touchData.v);
    const timer = setInterval(() => {
      if (this.touchData.v == 0) {
        clearInterval(timer);
        this.touchend();
      } else {
        if (Math.abs(this.touchData.v) > 3) {
          if (this.touchData.v > 0) {
            this.touchData.v /= 2;
          } else {
            this.touchData.v /= 2;
          }
        } else {
          this.touchData.v = 0;
        }
        // console.log('vv', this.touchData.v);
        this.transformY += this.touchData.v;
        this.elmentMove();
      }
    }, 30)
  },
  // bar渐渐消失
  barFade() {
    // 滚动条渐渐隐藏
    const timer = setInterval(()=> {
      if (this.barOptions.opacity === 0 ) {
        clearTimeout(timer);
      } else {
        this.barOptions.opacity = this.barOptions.opacity - .1 > 0 ? this.barOptions.opacity - .1 : 0;
      }
      this.elmentMove();
    }, 40)
  },
  touchDataChange(e) {
    this.touchData.startClientY = e.touches[0].clientY;
    this.touchData.startTime = new Date().getTime();
    if(this.touchData.points.length >= 10) {
      this.touchData.points.shift();
    }
    this.touchData.points.push({time: new Date().getTime(), clientY: e.touches[0].clientY});
  },
  elmentMove() {
    // console.log('eleMove', this.transformY);
    this.barOptions.transformY = -(this.scrollerOuter.offsetHeight / this.scrollerInner.offsetHeight) * this.transformY;
    this.scrollerInner.style = `transform: translateY(${this.transformY}px)`;
    this.scrollInnerBar.style = `background-color: #827f7f; border-radius: 5px; transform: translateY(${this.barOptions.transformY}px);height:${this.barOptions.height}%; opacity: ${this.barOptions.opacity}`;
  },
  touchstart(e) {
    this.startTop = e.touches[0].clientY;
    // console.log('touchstart', new Date().getTime());
  },
  touchmove(e) {
    // console.log('move', new Date().getTime());
    this.optionsUpdate();
    // 跟新触屏数据
    this.touchDataChange(e);
    this.barOptions.opacity = 1;
    // 移动距离计算
    const y = this.transformY + (e.touches[0].clientY - this.startTop);
    // 对上下滑动超出范围的限定
    // this.transformY = y > 100 ? 100 : (y < -100 - this.scrollerInnerHeight ? -100 - this.scrollerInnerHeight : y);
    this.transformY = y;
    // this.barOptions.transformY = -(this.scrollerOuter.offsetHeight / this.scrollerInner.offsetHeight) * this.transformY;
    this.startTop = e.touches[0].clientY;
    this.elmentMove();
    // 阻止Safari橡皮筋效果
    e.preventDefault();
  },
  touchend(e) {
    // console.log('end', new Date().getTime());
    this.optionsUpdate();
    if(this.transformY > 0) {
      // 下滑超出动画
      this.transformY -= 10;
      const timer = setInterval(()=> {
        if (this.transformY === 0) {
          clearInterval(timer);
          this.barFade();
        } else {
          this.transformY = this.transformY - 10 < 0 ? 0 : this.transformY - 10;
          this.barOptions.transformY = -(this.scrollerOuter.offsetHeight / this.scrollerInner.offsetHeight) * this.transformY;
        }
        this.elmentMove();
      }, 30)
    } else if (this.transformY < -this.scrollerInnerHeight) {
      // 上滑超出动画
      this.transformY += 10;
      const timer = setInterval(()=> {
        if (this.transformY >= -this.scrollerInnerHeight) {
          clearInterval(timer);
          this.barFade();
        } else {
          this.transformY = this.transformY + 10 > -this.scrollerInnerHeight ? -this.scrollerInnerHeight : this.transformY + 10;
          this.barOptions.transformY = -(this.scrollerOuter.offsetHeight / this.scrollerInner.offsetHeight) * this.transformY;
        }
        this.elmentMove();
      }, 30)
    } else {
      e && this.inertiaBar();
      this.barFade();
    }
  },
}

