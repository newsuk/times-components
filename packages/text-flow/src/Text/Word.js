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
      if (style !== char.style || href !== char.href) {
        const span = new Span()
        span.style = char.style
        span.text = char.character
        span.measuredWidth = char.measuredWidth
        span.measuredHeight = char.measuredHeight
        span.x = this.x + char.x
        span.y = this.y + char.y
        span.href = href
        spans.push(span)
        style = char.style
        href = char.href
      } else {
        const span = spans[spans.length - 1]
        span.measuredWidth += char.measuredWidth
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
          (width, char) => width + char.measuredWidth
          , 0)
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
            stretch: 12,
            shrink: 0
          })] : []
      )
    ]
  }

  //txt.CharacterText support
  lastCharacter() {
    return this.children[this.children.length - 1];
  }
}