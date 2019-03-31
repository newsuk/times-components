import StyledText from "./Styled";

export default class ItalicMarkup extends StyledText {
  constructor(props = {}) {
    super(props)
    this.style.font = 'TimesDigitalW04-Italic'
  }
}