import StyledText from "./Styled";

export default class BoldMarkup extends StyledText {
  constructor(props = {}) {
    super(props)
    this.style.font = 'TimesDigitalW04-Bold'
  }
}