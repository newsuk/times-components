import StyledText from "./Styled";

export default font => class BoldMarkup extends StyledText {
  constructor(props = {}) {
    super(props);
    this.style.font = font
  }
}
