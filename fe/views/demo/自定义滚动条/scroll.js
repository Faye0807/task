function Scroller ({} = {scrollerOuter: document.querySelector('#scrollerOuter'),scrollerInner: document.querySelector('#scrollerInner') }) {
  this.touchId = 'touchId';
  this.scrollerInner = scrollerInner;
  this.scrollerOuter = scrollerOuter;
  this.startTop = '';
  this.transformY = 0;
  this.height = 0;
  this.style = 'overflow: hidden';
  this.init();
}
Scroller.prototype = {
  constructor : 'Scroller',
  init() {
    this.height = this.scrollerInner.offsetHeight - this.scrollerOuter.offsetHeight;
    console.log('height', this.height)
    this.scrollerOuter.addEventListener('touchstart', this.touchstart.bind(this), false)
    this.scrollerOuter.addEventListener('touchmove', this.touchmove.bind(this), false)
    this.scrollerOuter.addEventListener('touchend', this.touchend.bind(this), false)
  },
  elmentMove() {
    this.scrollerInner.style = `transform: translateY(${this.transformY}px)`;
  },
  touchstart(e) {
    this.startTop = e.touches[0].clientY;
    console.log('touchstart');
  },
  touchmove(e) {
    // console.log('move', this.startTop);
    const y = this.transformY + (e.touches[0].clientY - this.startTop);
    // this.transformY = y > 10 ? 0 : (y < -this.height ? -this.height : y);
    this.transformY = y;
    this.elmentMove();
    this.startTop = e.touches[0].clientY;
    // 阻止Safari橡皮筋效果
    e.preventDefault();
  },
  touchend(e) {
    console.log('end');
    if(this.transformY > 0) {
      // 下滑超出动画
      this.transformY -= 10;
      const timer = setTimeout(()=> {
        if (this.transformY <= 0) {
          this.transformY = 0;
          clearTimeout(timer);
        } else {
          this.transformY = this.transformY - 10 < 0 ? 0 : this.transformY - 10;
        }
        this.elmentMove();
        this.touchend();
      }, 30)
    } else if (this.transformY < -this.height) {
      // 上滑超出动
      this.transformY += 10;
      const timer = setTimeout(()=> {
        if (this.transformY >= -this.height) {
          this.transformY = -this.height;
          clearTimeout(timer);
        } else {
          this.transformY = this.transformY + 10 > -this.height ? -this.height : this.transformY + 10;
        }
        this.elmentMove();
        this.touchend();
      }, 30)
    }
  },
}

