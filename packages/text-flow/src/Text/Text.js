/* eslint-disable prefer-destructuring,no-continue,no-underscore-dangle */
import Word from "./Word";
import Character from "./Character";
import Line from "./Line";
import Align from "./Align";
import Case from "./Case";
import Container from "../Layout/Container";
import Linebreak, { infinity } from "./Linebreak";
import Penalty from "./Penalty";
import Glue from "./Glue";
import Box from "./Box";

export default class Text extends Container {
  markup = [];

  lineHeight = 30;

  characters = [];

  width = 100;

  height = 30;

  _measuredHeight = 0;

  _measuredWidth = 0;

  align = Align.TOP_LEFT;

  characterCase = Case.NORMAL;

  size = 18;

  font = "TimesDigitalW04-Regular";

  tracking = 0;

  ligatures = false;

  fillColor = "#000";

  strokeColor = null;

  strokeWidth = null;

  loaderId = null;

  style = [];

  original = null;

  words = [];

  lines = [];

  _block;

  missingGlyphs = null;

  renderCycle = true;

  lineWidths = [660];

  inlined = false;

  // accessibility
  accessibilityText = null;

  accessibilityPriority = 2;

  accessibilityId = null;

  constructor(props = null) {
    super();
    if (props) {
      this.original = props;
      Object.assign(this, props);
    }
    if (props.width) {
      this.lineWidths = [props.width];
    }
  }

  get block() {
    if (!this._block) {
      this.layout()
    }
    return this._block
  }

  get measuredHeight() {
    if (!this._block) {
      this.layout()
    }
    return this._measuredHeight
  }

  get measuredWidth() {
    if (!this._block) {
      this.layout()
    }
    return this._measuredWidth
  }

  set measuredHeight(value) {
    this._measuredHeight = value
  }

  set measuredWidth(value) {
    this._measuredWidth = value
  }

  layout() {
    this.words = [];
    this.lines = [];
    this.missingGlyphs = null;
    // TODO - remove composite layout
    this.removeAllChildren();

    this._block = new Container();
    this.addChild(this._block);

    if (this.markup.length === 0 || this.markup === undefined) {
      return;
    }

    if (this.characterLayout() === false) {
      this.removeAllChildren();
      return;
    }

    if (this.renderCycle === false) {
      this.removeAllChildren();
      return;
    }

    this.wordLayout();
  }

  get idealSpans() {
    if (!this._block) {
      this.layout()
    }
    const flatSpans = this._block.children.reduce((acc, line) => {
      const ideal = line.idealSpans;
      return [...acc, ...ideal];
    }, []);
    const spans = [];
    let style = null;
    let href;
    for (let i = 0; i < flatSpans.length; i += 1) {
      const span = flatSpans[i];
      span.paragraph = this;
      if (span.style !== style || span.href !== href) {
        spans.push(span);
        href = span.href;
        style = span.style;
      } else {
        const prevSpan = spans[spans.length - 1];
        prevSpan.text += span.text;
        prevSpan.measuredHeight += Math.floor(span.measuredHeight);
      }
    }
    return spans;
  }

  // place characters in words
  characterLayout() {
    // characterlayout adds Charcters to words and measures true height. LineHeight is not a factor til Line layout.

    // char layout
    let char;
    const defaultStyle = {
      characterCase: this.characterCase,
      fillColor: this.fillColor,
      font: this.font,
      size: this.size,
      strokeColor: this.strokeColor,
      strokeWidth: this.strokeWidth,
      tracking: this.tracking
    };
    this.characters = this.markup.reduce(
      (acc, markup) => [...acc, ...markup.characters(defaultStyle)],
      []
    );
    const len = this.characters.length;
    let hPosition = 0;
    let vPosition = 0;

    let currentWord = new Word();
    // push a new word to capture characters
    this.words.push(currentWord);

    // loop over characters
    // place into words
    for (let i = 0; i < len; i += 1) {
      const currentStyle = this.characters[i].style;
      // newline
      // mark word as having newline
      // create new word
      // new line has no character
      if (this.characters[i].character === "\n") {
        // only if not last char
        if (i < len - 1) {
          currentWord.measuredWidth = hPosition;
          currentWord.measuredHeight = vPosition;
          if (currentWord.measuredHeight === 0) {
            currentWord.measuredHeight = currentStyle.size;
          }
          currentWord.hasNewLine = true;
          currentWord = new Word();
          this.words.push(currentWord);
          vPosition = 0;
          hPosition = 0;
        }
        continue
      }

      // create character
      char = new Character(this.characters[i].character, currentStyle, i);
      char.href = this.characters[i].href;

      if (char.missing) {
        if (this.missingGlyphs == null) {
          this.missingGlyphs = [];
        }
        this.missingGlyphs.push({
          character: this.characters[i].character,
          font: currentStyle.font,
          position: i
        });
      }

      if (char.measuredHeight > vPosition) {
        vPosition = char.measuredHeight;
      }

      char.x = hPosition;

      // push character into word
      currentWord.addChild(char);

      // space
      // mark word as having space
      // create new word
      // space character
      if (this.characters[i].character === " ") {
        currentWord.hasSpace = true;
        currentWord.spaceOffset = char.glyph.offset;
        hPosition =
          char.x +
          char.glyph.offset * char.size +
          char.characterCaseOffset +
          char.trackingOffset() +
          char.glyph.getKerning(
            (this.characters[i + 1] || { character: NaN }).character,
            char.size
          );
        currentWord.measuredWidth = hPosition;
        currentWord.measuredHeight = vPosition;
        hPosition = 0;
        vPosition = 0;
        currentWord = new Word();
        this.words.push(currentWord);
        continue
      }

      // hyphen
      // mark word as having hyphen
      // create new word
      // space character
      if (this.characters[i].character === "-") {
        currentWord.hasHyphen = true;
      }

      hPosition =
        char.x +
        char.glyph.offset * char.size +
        char.characterCaseOffset +
        char.trackingOffset() +
        char.glyph.getKerning(
          (this.characters[i + 1] || { character: NaN }).character,
          char.size
        );
    }
    // case of empty word at end.
    if (currentWord.children.length === 0) {
      this.words.pop();
      currentWord = this.words[this.words.length - 1];
      if (currentWord) {
        hPosition = currentWord.measuredWidth;
        vPosition = currentWord.measuredHeight;
      }
    }
    if (currentWord) {
      currentWord.measuredWidth = hPosition;
      currentWord.measuredHeight = vPosition;
    }

    return true;
  }

  // place words in lines
  wordLayout() {
    const boxes = this.words
      .reduce((acc, word) => [...acc, ...word.box], [])
      .concat([
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
      ]);

    const breaks = Linebreak(boxes, this.lineWidths).map(
      ({ position }) => position
    );

    let currentLine = new Line();
    this.lines.push(currentLine);
    currentLine.y = 0;

    let currentWord;

    this._block.addChild(currentLine);
    let hPosition = 0;
    let vPosition = 0;

    const words = [];
    for (let i = 0; i < boxes.length; i += 1) {
      const box = boxes[i];
      if (box instanceof Box) {
        currentWord = box.word;
        words.push(currentWord);
        currentWord.x = hPosition;
        currentWord.y = vPosition;
        hPosition += currentWord.measuredWidth;
        currentLine.addChild(currentWord);
        if (currentLine.measuredHeight < currentWord.measuredHeight) {
          currentLine.measuredHeight = currentWord.measuredHeight;
        }
        continue
      }
      if (breaks.includes(i) && i !== 0) {
        currentLine.measuredWidth = hPosition;
        if (this._block.measuredWidth < hPosition) {
          this._block.measuredWidth = hPosition;
        }
        vPosition += this.lineHeight || currentLine.measuredHeight;
        hPosition = 0;
        currentLine = new Line();
        currentLine.y = vPosition;
        this.lines.push(currentLine);
        this._block.addChild(currentLine);
      }
    }
    this._block.measuredHeight = vPosition;
    this.measuredHeight = this._block.measuredHeight;
    this.measuredWidth = this._block.measuredWidth;
  }
}
