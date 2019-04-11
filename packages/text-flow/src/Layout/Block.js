import Container from "./Container";

export default class Block extends Container {
  getComponent = () => {};

  width = 0;

  height = 0;

  constructor(props = {}) {
    super();
    Object.assign(this, props);
    this.measuredWidth = this.width;
    this.measuredHeight = this.height;
  }
}
