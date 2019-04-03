import FontLoader from './FontLoader';
import Word from './Word';
import Character from './Character';
import Line from './Line';
import Align from './Align';
import Case from './Case';
import Container from '../Layout/Container';
import Linebreak, { infinity } from './Linebreak';
import Penalty from './Penalty';
import Glue from './Glue';
import Box from './Box';

export default class Text extends Container {
  markup = [];
  lineHeight = null;
  characters = []
  width = 100;
  height = 20;
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
  block;
  missingGlyphs = null;
  renderCycle = true;
  lineWidths = [660]
  inlined = false

  //accessibility
  accessibilityText = null;
  accessibilityPriority = 2;
  accessibilityId = null;

  constructor(props = null) {
    super()
    if (props) {
      this.original = props;
      Object.assign(this, props);
    }
    if (props.width) {
      this.lineWidths = [props.width]
    }
    const fonts = [this.font].concat(Text.gatherFonts(this.markup))
    FontLoader.load(this, fonts);
    this.layout()
  }

  static gatherFonts(markup) {
    const fonts = []
    markup.forEach(child => {
      if (child.style && child.style.font) {
        fonts.push(child.style.font)
      }
      if (child.children) {
        Text.gatherFonts(child.children)
      }
    })
    return fonts
  }

  layout() {
    this.words = [];
    this.lines = [];
    this.missingGlyphs = null;
    // TODO - remove composite layout 
    this.removeAllChildren();

    this.block = new Container()
    this.addChild(this.block);

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
    this.lineLayout();
  }

  //place characters in words
  characterLayout() {
    //characterlayout adds Charcters to words and measures true height. LineHeight is not a factor til Line layout.

    //char layout
    var char;
    var defaultStyle = {
      size: this.size,
      font: this.font,
      tracking: this.tracking,
      characterCase: this.characterCase,
      fillColor: this.fillColor,
      strokeColor: this.strokeColor,
      strokeWidth: this.strokeWidth
    };
    this.characters = this.markup.reduce((acc, markup) => {
      return [...acc, ...markup.characters(defaultStyle)]
    }, [])
    var len = this.characters.length;
    var hPosition = 0;
    var vPosition = 0;

    var currentWord = new Word();
    // push a new word to capture characters
    this.words.push(currentWord);

    // loop over characters
    // place into words
    for (var i = 0; i < len; i++) {
      const currentStyle = this.characters[i].style || defaultStyle
      // newline
      // mark word as having newline
      // create new word
      // new line has no character
      if (this.characters[i].character == "\n") {

        //only if not last char
        if (i < len - 1) {
          currentWord.measuredWidth = hPosition;
          currentWord.measuredHeight = vPosition;
          if (currentWord.measuredHeight == 0) {
            currentWord.measuredHeight = currentStyle.size;
          }
          currentWord.hasNewLine = true;
          currentWord = new Word();
          this.words.push(currentWord);
          vPosition = 0;
          hPosition = 0;
        }

        continue;
      }

      //runtime test for font
      if (FontLoader.isLoaded(currentStyle.font) === false) {
        FontLoader.load(this, [currentStyle.font]);
        return false;
      }

      // create character
      char = new Character(this.characters[i].character, currentStyle, i);
      char.href = this.characters[i].href;

      if (char.missing) {
        if (this.missingGlyphs == null) {
          this.missingGlyphs = [];
        }
        this.missingGlyphs.push({ position: i, character: this.characters[i].character , font: currentStyle.font });
      }

      if (char.measuredHeight > vPosition) {
        vPosition = char.measuredHeight;
      }

      //swap character if ligature
      //ligatures removed if tracking or this.ligatures is false
      if (currentStyle.tracking == 0 && this.ligatures == true) {
        //1 char match
        const ligTarget = [
          this.characters[i].character,
          this.characters[i + 1].character,
          this.characters[i + 2].character,
          this.characters[i + 3].character,
        ].join('')
        if (char._font.ligatures[ligTarget.charAt(0)]) {
          //2 char match
          if (char._font.ligatures[ligTarget.charAt(0)][ligTarget.charAt(1)]) {
            //3 char match
            if (char._font.ligatures[ligTarget.charAt(0)][ligTarget.charAt(1)][ligTarget.charAt(2)]) {
              //4 char match
              if (char._font.ligatures[ligTarget.charAt(0)][ligTarget.charAt(1)][ligTarget.charAt(2)][ligTarget.charAt(3)]) {
                //swap 4 char ligature
                char.setGlyph(char._font.ligatures[ligTarget.charAt(0)][ligTarget.charAt(1)][ligTarget.charAt(2)][ligTarget.charAt(3)].glyph);
                i = i + 3;
              } else {
                //swap 3 char ligature
                char.setGlyph(char._font.ligatures[ligTarget.charAt(0)][ligTarget.charAt(1)][ligTarget.charAt(2)].glyph);
                i = i + 2;
              }
            } else {
              //swap 2 char ligature
              char.setGlyph(char._font.ligatures[ligTarget.charAt(0)][ligTarget.charAt(1)].glyph);
              i = i + 1;
            }
          }
        }
      }

      char.x = hPosition;

      // push character into word
      currentWord.addChild(char);


      // space
      // mark word as having space
      // create new word
      // space character
      if (this.characters[i].character == " ") {

        currentWord.hasSpace = true;
        currentWord.spaceOffset = (char._glyph.offset * char.size);
        hPosition = char.x + (char._glyph.offset * char.size) + char.characterCaseOffset + char.trackingOffset() + char._glyph.getKerning((this.characters[i + 1] || { character: NaN }).character, char.size);
        currentWord.measuredWidth = hPosition;
        currentWord.measuredHeight = vPosition;
        hPosition = 0;
        vPosition = 0;
        currentWord = new Word();
        this.words.push(currentWord);
        continue;
      }


      // hyphen
      // mark word as having hyphen
      // create new word
      // space character
      if (this.characters[i].character == "-") {
        currentWord.hasHyphen = true;
      }

      hPosition = char.x + (char._glyph.offset * char.size) + char.characterCaseOffset + char.trackingOffset() + char._glyph.getKerning((this.characters[i + 1] || { character: NaN }).character, char.size);

    }
    //case of empty word at end.
    if (currentWord.children.length == 0) {
      var lw = this.words.pop();
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
  
  //place words in lines
  wordLayout() {
    const boxes = this.words.reduce((acc, word) => {
      return [...acc, ...word.box]
    }, []).concat([
      new Glue({
        width: 0,
        stretch: infinity,
        shrink: 0
      }),
      new Penalty({
        width: 0,
        penalty: -infinity,
        flagged: 1
      }),
      new Box({
        word: new Word()
      }),
      new Glue({
        width: 0,
        stretch: infinity,
        shrink: 0
      }),
      new Penalty({
        width: 0,
        penalty: -infinity,
        flagged: 1
      }),
    ])

    const breaks = Linebreak(boxes, this.lineWidths)
      .map(({ position }) => position)
    
    let currentLine = new Line()
    this.lines.push(currentLine);
    currentLine.y = 0

    let currentWord;

    this.block.addChild(currentLine);
    let hPosition = 0;
    let vPosition = 0;

    const words = []
    for (let i = 0; i < boxes.length; i++) {
      let box = boxes[i];
      if (box instanceof Box) {
        currentWord = box.word;
        words.push(currentWord)
        currentWord.x = hPosition;
        currentWord.y = vPosition;
        hPosition += currentWord.measuredWidth;
        currentLine.addChild(currentWord)
        if (currentLine.measuredHeight < currentWord.measuredHeight) {
          currentLine.measuredHeight = currentWord.measuredHeight
        }
        continue
      }
      if (breaks.includes(i) && i !== 0) {
        currentLine.measuredWidth = hPosition;
        if (this.block.measuredWidth < hPosition) {
          this.block.measuredWidth = hPosition
        }
        vPosition += this.lineHeight || currentLine.measuredHeight;
        hPosition = 0;
        currentLine = new Line();
        currentLine.y = vPosition;
        this.lines.push(currentLine);
        this.block.addChild(currentLine);
      }
    }
    this.block.measuredHeight = vPosition
  }

  lineLayout() {
    // loop over lines
    // place into text
    var measuredHeight = 0;
    var line;
    var a = Align;
    var fnt = FontLoader.getFont(this.font);

    var len = this.lines.length;
    for (var i = 0; i < len; i++) {

      line = this.lines[i];

      //correct measuredWidth if last line character contains tracking
      if (line.lastWord() != undefined && line.lastWord().lastCharacter()) {
        line.measuredWidth -= line.lastWord().lastCharacter().trackingOffset();
      }

      measuredHeight += line.measuredHeight;
      if (this.align === a.TOP_CENTER) {
        //move to center
        line.x = (this.width - line.measuredWidth) / 2;
      } else if (this.align === a.TOP_RIGHT) {
        //move to right
        line.x = (this.width - line.measuredWidth);
      } else if (this.align === a.MIDDLE_CENTER) {
        //move to center
        line.x = (this.width - line.measuredWidth) / 2;
      } else if (this.align === a.MIDDLE_RIGHT) {
        //move to right
        line.x = (this.width - line.measuredWidth);
      } else if (this.align === a.BOTTOM_CENTER) {
        //move to center
        line.x = (this.width - line.measuredWidth) / 2;
      } else if (this.align === a.BOTTOM_RIGHT) {
        //move to right
        line.x = (this.width - line.measuredWidth);
      }
    }

    //TOP ALIGNED
    if (this.align === a.TOP_LEFT || this.align === a.TOP_CENTER || this.align === a.TOP_RIGHT) {
      this.block.y = this.lines[0].measuredHeight * fnt.ascent / fnt.units + this.lines[0].measuredHeight * fnt.top / fnt.units;

      //MIDDLE ALIGNED
    } else if (this.align === a.MIDDLE_LEFT || this.align === a.MIDDLE_CENTER || this.align === a.MIDDLE_RIGHT) {
      this.block.y = this.lines[0].measuredHeight + (this.height - measuredHeight) / 2 + this.lines[0].measuredHeight * fnt.middle / fnt.units;

      //BOTTOM ALIGNED
    } else if (this.align === a.BOTTOM_LEFT || this.align === a.BOTTOM_CENTER || this.align === a.BOTTOM_RIGHT) {
      this.block.y = this.height - this.lines[this.lines.length - 1].y + this.lines[0].measuredHeight * fnt.bottom / fnt.units;
    }

    this.measuredHeight = this.block.measuredHeight
    this.measuredWidth = this.block.measuredWidth
  }
}
