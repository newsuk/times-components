import Container from "./Container";
import BlockAlign from "./BlockAlign";

export default class InlineBlock extends Container {
  alignment = BlockAlign.LEFT;

  getComponent = () => {};

  width = 0;

  height = 0;

  constructor(props = {}) {
    super();
    Object.assign(this, props);
    this.measuredWidth = this.width;
  }
}
