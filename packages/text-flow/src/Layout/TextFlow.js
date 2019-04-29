import Container from "./Container";
import Text from "../Text/Text";
import Block from "./Block";
import InlineBlock from './InlineBlock'

export default class TextFlow extends Container {
  block = null
  width = 100
  height = 20
  flow = []

  // TODO: operate only on args and block, not children
  constructor(props = {}) {
    super()
    Object.assign(this, props)
    this.layout()
  }

  layout() {
    this.block = new Container();
    let vPosition = 0
    let i = 0
    for (;i < this.flow.length;) {
      const child = this.flow[i];
      if (!child) {
        break
      }
      if (child instanceof InlineBlock) {
        let grabbed = i + 1
        let next = this.flow[grabbed]

        if (!(next instanceof Text)) {
          throw new Error("Float stacking is not supported")
        }

        const elWidth = child.width;
        const elHeight = child.height;

        const elNumLines = Math.ceil(elHeight / next.lineHeight);
        const elLines = []
        while (elNumLines !== elLines.length) {
          elLines.push(this.width - elWidth)
        }
        elLines.push(this.width)

        child.y = vPosition;
        this.block.addChild(child)
        let pulledLines = 0
        while (true) {
          if (!(next instanceof Text)) {
            // Support merging of inlines one day
            grabbed -= 1
            break
          }
          next.lineWidths = elLines.slice(pulledLines)
          next.width = this.width
          next.layout()
          if (this.block.measuredWidth < (next.measuredWidth + child.measuredWidth)) {
            this.block.measuredWidth = next.measuredWidth + child.measuredWidth
          }
          next.y = vPosition
          vPosition += next.measuredHeight
          pulledLines += next.lines.length + 1
          next.block.children.forEach((line, i) => {
            if (next.lineWidths[i] < this.width) {
              line.x = child.width
              line.children.forEach(word => {
                word.moveX(child.width)
              })
            }
          })
          this.block.addChild(next)
          grabbed += 1
          next = this.flow[grabbed]
          if (pulledLines >= elNumLines || !next) {
            break
          }
        }
        i = grabbed
        if (child.measuredHeight < child.height) {
          vPosition += child.height - child.measuredHeight
          this.block.measuredHeight += child.height
        } else {
          this.block.measuredHeight += child.measuredHeight
        }
        continue
      }
      if (child instanceof Block) {
        this.block.addChild(child)
        this.block.measuredHeight += child.measuredHeight
        if (this.block.measuredWidth < child.measuredWidth) {
          this.block.measuredWidth = child.measuredWidth
        }
        child.y = vPosition
        vPosition += child.measuredHeight
        i += 1
        continue
      }
      if (child instanceof Text) {
        this.block.addChild(child)
        this.block.measuredHeight += child.measuredHeight
        if (this.block.measuredWidth < child.measuredWidth) {
          this.block.measuredWidth = child.measuredWidth
        }
        child.y = vPosition
        vPosition += child.measuredHeight
        i += 1
      }
    }
    this.measuredHeight = this.block.measuredHeight
    this.measuredWidth = this.block.measuredWidth
  }
}