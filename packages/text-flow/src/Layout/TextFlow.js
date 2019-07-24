/* eslint-disable no-continue,no-underscore-dangle */
import Container from "./Container";
import Text from "../Text/Text";
import Block from "./Block";
import InlineBlock from "./InlineBlock";

export default class TextFlow extends Container {
  _block = null;

  width = 100;

  height = 20;

  flow = [];

  // TODO: operate only on args and block, not children
  constructor(props = {}) {
    super();
    Object.assign(this, props);
  }

  get block() {
    if (!this._block) {
      this.layout()
    }
    return this._block
  }

  layout() {
    this._block = new Container();
    let vPosition = 0;
    let i = 0;
    for (; i < this.flow.length; ) {
      const child = this.flow[i];
      if (!child) {
        break;
      }
      if (child instanceof TextFlow) {
        throw new Error("Nested text flows is not supported");
      }
      if (child instanceof InlineBlock) {
        let grabbed = i + 1;
        let next = this.flow[grabbed];
        child.children = [];

        if (!(next instanceof Text)) {
          i += 1
          continue
        }

        const elWidth = child.width;
        const elHeight = child.height;

        const elNumLines = Math.ceil(elHeight / next.lineHeight);
        const elLines = [];
        while (elNumLines > elLines.length) {
          elLines.push(this.width - elWidth);
        }
        elLines.push(this.width);

        child.y = vPosition;
        this._block.addChild(child);
        let pulledLines = 0;
        while (next) {
          if (!(next instanceof Text)) {
            // Support merging of inlines one day
            break;
          }
          next.lineWidths = elLines.slice(pulledLines);
          next.width = this.width;
          next.layout();
          if (
            this._block.measuredWidth <
            next.measuredWidth + child.measuredWidth
          ) {
            this._block.measuredWidth = next.measuredWidth + child.measuredWidth;
          }
          next.y = vPosition;
          pulledLines += next.lines.length - 1;
          for (let j = 0; j < next.block.children.length; j += 1) {
            const line = next.block.children[j];
            if (next.lineWidths[j] < this.width) {
              line.x = child.width;
              line.children.forEach(word => {
                word.moveX(child.width);
              });
            }
          }
          vPosition += next.measuredHeight;
          child.addChild(next);
          grabbed += 1;
          next = this.flow[grabbed];
          if (pulledLines >= elNumLines || !next) {
            break;
          }
        }
        i = grabbed;
        this._block.measuredHeight += child.height;
        continue
      }
      if (child instanceof Block || child instanceof Text) {
        this._block.addChild(child);
        this._block.measuredHeight += child.measuredHeight;
        if (this._block.measuredWidth < child.measuredWidth) {
          this._block.measuredWidth = child.measuredWidth;
        }
        child.y = vPosition;
        vPosition += child.measuredHeight;
      }
      i += 1;
    }
    this.measuredHeight = this._block.measuredHeight;
    this.measuredWidth = this._block.measuredWidth;
  }
}
