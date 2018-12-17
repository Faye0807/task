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
    endClienY: 0
  };
  this.init();
}
Scroller.prototype = {
  constructor: 'Scroller',
  init() {
    this.optionsUpdate();
    this.createScrollBar();
    this.scrollerOuter.appendChild(this.scrollBar);
    this.scrollerOuter.style = `${this.scrollerOuter.style};position:absolute;width:100%;height:100%;`;
    this.scrollerOuter.addEventListener('touchstart', this.touchstart.bind(this), false)
    this.scrollerOuter.addEventListener('touchmove', this.touchmove.bind(this), false)
    this.scrollerOuter.addEventListener('touchend', this.touchend.bind(this), false)
  },
  createScrollBar() {
    this.scrollBar = document.createElement('div');
    this.scrollInnerBar = document.createElement('div');
    this.scrollBar.style = 'width: .8%;height:100%;position: absolute;right:.5%;top: 0;';
    this.scrollBar.appendChild(this.scrollInnerBar);
  },
  optionsUpdate() {
    this.scrollerInnerHeight = this.scrollerInner.offsetHeight - this.scrollerOuter.offsetHeight;
    this.barOptions.height = (this.scrollerOuter.offsetHeight / (this.scrollerInner.offsetHeight)) * 100;
  },
  moveBar() {
    
  },
  elmentMove() {
    this.scrollerInner.style = `transform: translateY(${this.transformY}px)`;
    this.scrollInnerBar.style = `background-color: #827f7f; border-radius: 5px; transform: translateY(${this.barOptions.transformY}px);height:${this.barOptions.height}%; opacity: ${this.barOptions.opacity}`;
  },
  touchstart(e) {
    this.startTop = e.touches[0].clientY;
    console.log('touchstart');
  },
  touchmove(e) {
    this.optionsUpdate();
    this.barOptions.opacity = 1;
    // 移动距离计算
    const y = this.transformY + (e.touches[0].clientY - this.startTop);
    this.transformY = y > 100 ? 100 : (y < -100 - this.scrollerInnerHeight ? -100 - this.scrollerInnerHeight : y);
    this.barOptions.transformY = -(this.scrollerOuter.offsetHeight / this.scrollerInner.offsetHeight) * this.transformY;
    this.startTop = e.touches[0].clientY;
    this.elmentMove();
    // 阻止Safari橡皮筋效果
    e.preventDefault();
  },
  touchend(e) {
    console.log('end');
    this.optionsUpdate();
    if(this.transformY > 0) {
      // 下滑超出动画
      this.transformY -= 10;
      const timer = setTimeout(()=> {
        if (this.transformY === 0) {
          clearTimeout(timer);
        } else {
          this.transformY = this.transformY - 10 < 0 ? 0 : this.transformY - 10;
          this.barOptions.transformY = -(this.scrollerOuter.offsetHeight / this.scrollerInner.offsetHeight) * this.transformY;
        }
        this.elmentMove();
        this.touchend();
      }, 30)
    } else if (this.transformY < -this.scrollerInnerHeight) {
      // 上滑超出动画
      this.transformY += 10;
      const timer = setTimeout(()=> {
        if (this.transformY >= -this.scrollerInnerHeight) {
          this.transformY = -this.scrollerInnerHeight;
          this.barOptions.transformY = 
          clearTimeout(timer);
        } else {
          this.transformY = this.transformY + 10 > -this.scrollerInnerHeight ? -this.scrollerInnerHeight : this.transformY + 10;
          this.barOptions.transformY = -(this.scrollerOuter.offsetHeight / this.scrollerInner.offsetHeight) * this.transformY;
        }
        this.elmentMove();
        this.touchend();
      }, 30)
    } else {
      this.elmentMove();
      // 滚动条渐渐隐藏
      const timer = setInterval(()=> {
        if (this.barOptions.opacity === 0 ) {
          clearTimeout(timer);
        } else {
          this.barOptions.opacity = this.barOptions.opacity - .1 > 0 ? this.barOptions.opacity - .1 : 0;
        }
        this.elmentMove();
      }, 40)
    }
  },
}

