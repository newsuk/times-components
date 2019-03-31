import Container from "./Container";
import Text from "../Text/Text";
import Block from "./Block";
import InlineBlock from './InlineBlock'
import BlockAlign from "./BlockAlign";

export default class TextFlow extends Container {
  block = null
  width = 100
  height = 20

  constructor(props = {}) {
    super()
    Object.assign(this, props)
    this.layout()
  }

  layout() {
    this.block = new Container();
    let vPosition = 0
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (child instanceof InlineBlock) {
        let grabbed = i + 1
        let next = this.children[grabbed]

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

        this.block.addChild(child)
        child.moveY(vPosition)
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
          next.moveY(vPosition)
          next.moveX(child.x)
          if (child.alignment === BlockAlign.LEFT) {
            next.lines.forEach((line, indx) => {
              if (next.lineWidths[indx] !== undefined && next.lineWidths[indx] !== next.width) {
                line.x += child.width
                line.children.forEach(word => {
                  word.x += child.width
                  word.children.forEach(char => {
                    char.x += child.width
                  })
                })
              }
            });
          }
          this.block.addChild(next)
          if (this.block.measuredWidth < (next.measuredWidth + child.measuredWidth)) {
            this.block.measuredWidth = next.measuredWidth + child.measuredWidth
          }
          child.measuredHeight += next.measuredHeight
          vPosition += next.measuredHeight
          pulledLines += next.lines.length + 1
          child.addChild(next)
          if (pulledLines >= elNumLines) {
            break
          }
          grabbed += 1
          next = this.children[grabbed]
          if (!next) {
            break
          }
        }
        i = grabbed
        if (child.alignment === BlockAlign.RIGHT) {
          child.moveX(next.lines[0].measuredWidth)
        }
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
        child.moveY(vPosition)
        vPosition += child.measuredHeight
        continue
      }
      if (child instanceof Text) {
        this.block.addChild(child)
        this.block.measuredHeight += child.measuredHeight
        if (this.block.measuredWidth < child.measuredWidth) {
          this.block.measuredWidth = child.measuredWidth
        }
        child.moveY(vPosition)
        vPosition += child.measuredHeight
      }
    }
    this.measuredHeight = this.block.measuredHeight
    this.measuredWidth = this.block.measuredWidth
  }
}