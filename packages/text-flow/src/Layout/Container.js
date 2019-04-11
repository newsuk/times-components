import Positioned from "./Positioned";

export default class Container extends Positioned {
  children = [];

  constructor(props = {}) {
    super();
    Object.assign(this, props);
  }

  moveX(val) {
    Positioned.prototype.moveX.call(this, val);
    this.children.forEach(child => {
      child.moveX(val);
    });
  }

  moveY(val) {
    Positioned.prototype.moveY.call(this, val);
    this.children.forEach(child => {
      child.moveY(val);
    });
  }

  removeAllChildren() {
    this.children = [];
  }

  addChild(child) {
    this.children.push(child);
  }
}
