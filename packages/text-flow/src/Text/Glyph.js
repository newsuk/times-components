/* eslint-disable no-restricted-globals */
export default class Glyph {
  path = "";

  offset;

  kerning = {};

  _graphic = null;

  _fill;

  _stroke;

  _strokeStyle;

  constructor(props = {}) {
    Object.assign(this, props);
  }

  getKerning(characterCode, size) {
    const out = -(this.kerning[characterCode] * size);
    if (isNaN(out)) {
      return 0;
    }
    if (isNaN(characterCode)) {
      return 0;
    }
    if (isNaN(size)) {
      return 0;
    }
    if (this.kerning[characterCode] !== undefined) {
      return out;
    }
    return 0;
  }
}
