import Container from "../Layout/Container";
import Box from "./Box";
import Penalty from './Penalty';
import Glue from './Glue';
import { infinity } from './Linebreak';
import Span from "./Span"

export default class Word extends Container {
  hasNewLine = false;
  hasHyphen = false;
  hasSpace = false;
  measuredWidth = 0;
  measuredHeight = 0;
  spaceOffset = 0;

  constructor(props = {}) {
    super();
    Object.assign(this, props);
  }

  get idealSpans() {
    const spans = []
    let style = null
    let href = undefined
    for (let i = 0; i < this.children.length; i += 1) {
      const char = this.children[i]
      if ((style !== char.style) || (href !== char.href)) {
        href = char.href
        const span = new Span()
        span.word = this
        span.style = char.style
        span.text = char.character
        span.measuredWidth += Math.floor(char.getWidth())
        span.measuredHeight = char.measuredHeight
        span.x = Math.floor(char.x)
        span.y = this.y + char.y
        span.href = href
        spans.push(span)
        style = char.style
      } else {
        const span = spans[spans.length - 1]
        span.measuredWidth += Math.floor(char.getWidth())
        span.text += char.character
      }
    }
    return spans
  }

  get box() {
    return [
      new Box({
        word: this,
        value: this.children.map(char => char.character).join(''),
        width: this.children.reduce(
          (width, char) => {
            return width + char.getWidth()
          }, 0)
      }),
      ...(
        this.hasNewLine ?
          [
            new Glue({
              width: 0,
              stretch: infinity,
              shrink: 0
            }),
            new Penalty({
              width: 0,
              penalty: -infinity,
              flagged: 1
            })
          ] : []
      ),
      ...(
        this.hasSpace ?
          [new Glue({
            width: 0,
            stretch: this.spaceOffset,
            shrink: this.spaceOffset / 3
          })] : []
      )
    ]
  }

  //txt.CharacterText support
  lastCharacter() {
    return this.children[this.children.length - 1];
  }
}