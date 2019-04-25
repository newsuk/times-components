/* eslint-disable no-param-reassign */
import TextStyle from "./TextStyle";
import Markup from "./Markup";

export default class StyledText extends Markup {
  style = new TextStyle();

  characters(textStyle) {
    if (!this.style.size) this.style.size = textStyle.size;
    if (!this.style.font) this.style.font = textStyle.font;
    if (!this.style.tracking) this.style.tracking = textStyle.tracking;
    if (!this.style.characterCase)
      this.style.characterCase = textStyle.characterCase;
    if (!this.style.strokeWidth) this.style.strokeWidth = textStyle.strokeWidth;
    return this.children.reduce(
      (acc, child) => [
        ...acc,
        ...child.characters(this.style).map(c => {
          Object.keys(this.style).forEach(key => {
            if (c.style[key] !== this.style[key]) {
              c.style[key] = this.style[key];
            }
          });
          return c;
        })
      ],
      []
    );
  }
}
