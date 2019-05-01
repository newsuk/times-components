export default class Font {
  glyphs = {};

  kerning = {};

  missing;

  offset;

  default;

  descent;

  ascent;

  top = 0;

  middle = 0;

  bottom = 0;

  units = 1000;

  id;

  ligatures = {};

  panose;

  alphabetic;

  loaded = false;

  targets = [];

  loader;

  constructor(props = {}) {
    Object.assign(this, props);
  }

  cloneGlyph(target, from) {
    if (this.glyphs[target] === undefined && this.glyphs[from] !== undefined) {
      this.glyphs[target] = this.glyphs[from];
      this.kerning[target] = this.kerning[from];
    }
  }
}
