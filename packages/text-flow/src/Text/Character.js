import Positioned from "../Layout/Positioned";
import Case from './Case';
import FontLoader from './FontLoader';

export default class Character extends Positioned {
  character = '';
  characterCode = null;
  font = null;
  tracking = null;
  characterCase = null;
  characterCaseOffset = 0;
  index = null;
  size = null;
  fillColor = null;
  strokeColor = null;
  strokeWidth = null;
  measuredWidth = null;
  measuredHeight = null;
  missing = false;
  link = null;
  style = null;

  _glyph;
  _font;

  constructor(character, style = {}, index = null, glyph = null) {
    super();
    this.character = character;
    this.index = index;
    this.style = style

    Object.assign(this, style);
    this.index = index;

    // flip case depending on characterCase property
    if (this.characterCase == Case.NORMAL) {
      this.character = character;
    } else if (this.characterCase == Case.UPPER) {
      this.character = character.toUpperCase();
    } else if (this.characterCase == Case.LOWER) {
      this.character = character.toLowerCase();
    } else if (this.characterCase == Case.SMALL_CAPS) {
      this.character = character.toUpperCase();
      var upperSmall = !(character === this.character);
    } else {
      //fallback case for unknown.
      this.character = character;
    }
    this.characterCode = this.character.charCodeAt(0);



    this._font = FontLoader.getFont(this.font);

    if (this._font.glyphs[this.characterCode]) {
      this._glyph = this._font.glyphs[this.characterCode];

      //flip lower
    } else if (this._font.glyphs[String.fromCharCode(this.characterCode).toLowerCase().charCodeAt(0)]) {
      this._glyph = this._font.glyphs[String.fromCharCode(this.characterCode).toLowerCase().charCodeAt(0)];

      //flip upper
    } else if (this._font.glyphs[String.fromCharCode(this.characterCode).toUpperCase().charCodeAt(0)]) {
      this._glyph = this._font.glyphs[String.fromCharCode(this.characterCode).toUpperCase().charCodeAt(0)];
    }

    //missing glyph
    if (this._glyph === undefined) {
      console.log("MISSING GLYPH:" + "'" + this.character + "'");
      this._glyph = this._font.glyphs[42];
      this.missing = true;
    }

    if (this.characterCase === Case.SMALL_CAPS) {
      if (upperSmall) {
        this.scaleX = this.size / this._font.units * 0.8;
        this.characterCaseOffset = -0.2 * (this._glyph.offset * this.size);
      } else {
        this.scaleX = this.size / this._font.units;
      }
    } else {
      this.scaleX = this.size / this._font.units;
    }

    this.scaleY = -this.scaleX;

    this.measuredHeight = (this._font.ascent - this._font.descent) * this.scaleX;
    this.measuredWidth = this.scaleX * this._glyph.offset * this._font.units;

    this.hitArea = new Positioned({
      x: 0,
      y: this._font.descent,
      width: this._glyph.offset * this._font.units,
      height: this._font.ascent - this._font.descent
    });
  }

  setGlyph(glyph) {
    this._glyph = glyph;
  }

  trackingOffset() {
    return this.size * (2.5 / this._font.units + 1 / 900 + this.tracking / 990);
  }

  draw(ctx) {
    this._glyph._fill.style = this.fillColor;
    this._glyph._fill.matrix = null;
    this._glyph._stroke.style = this.strokeColor;
    this._glyph._strokeStyle.width = this.strokeWidth;
    return this._glyph.draw(ctx);
  }

  getWidth() {
    return this.size * this._glyph.offset;
  }
}