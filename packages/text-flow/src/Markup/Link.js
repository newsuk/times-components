/* eslint-disable no-param-reassign */
import StyledText from "./Styled";

export default font => class LinkText extends StyledText {
  href = null;

  constructor(props = {}) {
    super(props);
    this.href = props.href;
    this.style.font = font
  }

  characters(textStyle) {
    const chars = StyledText.prototype.characters.call(this, textStyle);
    return chars.map(char => {
      char.href = this.href;
      return char;
    });
  }
}
