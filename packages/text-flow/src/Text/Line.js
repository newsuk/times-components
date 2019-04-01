import Container from "../Layout/Container";

export default class Line extends Container {

  measuredWidth = 0;
  measuredHeight = 0;

  constructor(props = {}) {
    super();
    Object.assign(this, props)
  }

  get idealSpans() {
    const flatSpans = this.children
      .reduce((acc, word) => [...acc, ...word.idealSpans]
      , [])
    const spans = []
    let style = null
    let href = undefined
    for (let i = 0; i < flatSpans.length; i += 1) {
      const span = flatSpans[i]
      if (span.style !== style || span.href !== href) {
        spans.push(span)
        href = span.href
        style = span.style
        span.y = this.y
      } else {
        const prevSpan = spans[spans.length - 1]
        prevSpan.text += span.text
        prevSpan.measuredWidth += Math.floor(span.measuredWidth)
      }
    }
    if (spans.length) {
      let hPosition = 0
      spans.forEach(span => {
        span.x = hPosition
        hPosition += Math.floor(span.measuredWidth)
      })
    }
    return spans
  }

  //txt.Text support
  lastWord() {
    return this.children[this.children.length - 1];
  }

  //txt.CharacterText support
  lastCharacter() {
    return this.children[this.children.length - 1];
  }

}