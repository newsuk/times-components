/* eslint-disable prefer-destructuring */
import Positioned from "../Layout/Positioned";
import FontLoader from "./FontLoader";

export default class Character extends Positioned {
  character = "";

  characterCode = null;

  font = null;

  tracking = null;

  characterCase = null;

  characterCaseOffset = 0;

  index = null;

  size = 18;

  fillColor = null;

  strokeColor = null;

  strokeWidth = null;

  measuredWidth = null;

  measuredHeight = null;

  missing = false;

  link = null;

  style = null;

  glyph;

  fontInstance;

  constructor(character, style = {}, index = null) {
    super();
    this.character = character;
    this.index = index;
    this.style = style;

    Object.assign(this, style);
    this.index = index;

    this.characterCode = this.character.charCodeAt(0);

    this.fontInstance = FontLoader.getFont(this.font);
    
    if (this.fontInstance.glyphs[this.characterCode]) {
      this.glyph = this.fontInstance.glyphs[this.characterCode];

      // flip lower
    } else if (
      this.fontInstance.glyphs[
        String.fromCharCode(this.characterCode)
          .toLowerCase()
          .charCodeAt(0)
      ]
    ) {
      this.glyph = this.fontInstance.glyphs[
        String.fromCharCode(this.characterCode)
          .toLowerCase()
          .charCodeAt(0)
      ];

      // flip upper
    } else if (
      this.fontInstance.glyphs[
        String.fromCharCode(this.characterCode)
          .toUpperCase()
          .charCodeAt(0)
      ]
    ) {
      this.glyph = this.fontInstance.glyphs[
        String.fromCharCode(this.characterCode)
          .toUpperCase()
          .charCodeAt(0)
      ];
    }

    // missing glyph
    if (this.glyph === undefined) {
      // throw new Error(`Missing glyph: '${this.character}'`)
      this.glyph = this.fontInstance.glyphs[77];
      this.missing = true;
    }

    this.scaleX = this.size / this.fontInstance.units;
    this.scaleY = -this.scaleX;

    this.measuredHeight =
      (this.fontInstance.ascent - this.fontInstance.descent) * this.scaleX;
    this.measuredWidth =
      this.scaleX * this.glyph.offset * this.fontInstance.units;

    this.hitArea = new Positioned({
      height: this.fontInstance.ascent - this.fontInstance.descent,
      width: this.glyph.offset * this.fontInstance.units,
      x: 0,
      y: this.fontInstance.descent
    });
  }

  setGlyph(glyph) {
    this.glyph = glyph;
  }

  trackingOffset() {
    return (
      this.size *
      (2.5 / this.fontInstance.units + 1 / 900 + this.tracking / 990)
    );
  }

  getWidth() {
    return this.size * this.glyph.offset;
  }
}
