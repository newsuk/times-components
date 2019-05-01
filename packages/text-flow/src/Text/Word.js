/* eslint-disable prefer-destructuring */
import Container from "../Layout/Container";
import Box from "./Box";
import Penalty from "./Penalty";
import Glue from "./Glue";
import { infinity } from "./Linebreak";
import Span from "./Span";

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
    const spans = [];
    let style = null;
    let href;
    for (let i = 0; i < this.children.length; i += 1) {
      const char = this.children[i];
      if (style !== char.style || href !== char.href) {
        href = char.href;
        const span = new Span();
        span.word = this;
        span.style = char.style;
        span.text = char.character;
        span.measuredWidth += char.getWidth();
        span.measuredHeight = char.measuredHeight;
        span.x = char.x;
        span.y = this.y + char.y;
        span.href = href;
        spans.push(span);
        style = char.style;
      } else {
        const span = spans[spans.length - 1];
        span.measuredWidth += char.getWidth();
        span.text += char.character;
      }
    }
    if (spans.length && this.hasNewLine) {
      spans[spans.length - 1].text += "\n";
    }
    return spans;
  }

  get box() {
    return [
      new Box({
        value: this.children.map(char => char.character).join(""),
        width: this.children.reduce(
          (width, char) => width + char.getWidth(),
          0
        ),
        word: this
      }),
      ...(this.hasNewLine
        ? [
            new Glue({
              shrink: 0,
              stretch: infinity,
              width: 0
            }),
            new Penalty({
              flagged: 1,
              penalty: -infinity,
              width: 0
            })
          ]
        : []),
      ...(this.hasSpace
        ? [
            new Glue({
              shrink: this.spaceOffset / 2,
              stretch: this.spaceOffset,
              width: this.spaceOffset
            })
          ]
        : [])
    ];
  }

  // txt.CharacterText support
  lastCharacter() {
    return this.children[this.children.length - 1];
  }
}
