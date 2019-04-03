import StyledText from "./Styled";

export default class LinkText extends StyledText {
  href = null

  constructor(props = {}) {
    super(props)
    this.href = props.href
    this.style.font = 'TimesDigitalW04-Bold'
  }

  characters(textStyle) {
    const chars = StyledText.prototype.characters.call(this, textStyle)
    return chars.map(char => {
      char.href = this.href
      return char
    })
  }
}