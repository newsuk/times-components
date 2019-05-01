import StyledText from "./Styled";

export default font => class ItalicMarkup extends StyledText {
  constructor(props = {}) {
    super(props);
    this.style.font = font;
  }
}
