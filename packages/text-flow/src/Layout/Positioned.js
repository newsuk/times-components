export default class Positioned {
  x = 0;

  y = 0;

  measuredWidth = 0;

  measuredHeight = 0;

  constructor(props = {}) {
    Object.assign(this, props);
  }

  moveX(val) {
    this.x += val;
  }

  moveY(val) {
    this.y += val;
  }
}
