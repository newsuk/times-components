/* eslint-disable default-case,no-param-reassign,no-underscore-dangle */
import Glyph from "./Glyph";

export default class FontLoader {
  static path = "/font/";

  static cache = false;

  static version = 0;

  static fonts = {};

  constructor(props = {}) {
    Object.assign(this, props);
  }

  static isLoaded(name) {
    if (name in FontLoader.fonts) {
      return FontLoader.fonts[name].loaded;
    }
    return false;
  }

  static getFont(name) {
    if (name in FontLoader.fonts) {
      return FontLoader.fonts[name];
    }
    throw new Error(`Missing font: ${name}`)
  }

  static loadFont(fontName, data) {
    // determine if font exists in memory
    if (fontName in FontLoader.fonts) {
      // loading complete
      return
      // load from scratch
    }

    FontLoader.fonts[fontName] = data;
    Object.keys(data.glyphs).forEach(index => {
      const {offset} = data.glyphs[index]
      const glyph = new Glyph()
      glyph.offset = offset / data.units
      glyph.kerning = {}
      glyph.path = String.fromCharCode(index)
      Object.keys(glyph.kerning).forEach(ind => {
        const kern = data.kerning[ind] / data.units
        glyph.kerning[ind] = kern
      })
      data.glyphs[index] = glyph
    })
    Object.keys(data.kerning).forEach(first => {
      const k = data.kerning[first]
      Object.keys(k).forEach(second => {
        if (data.kerning[first] === undefined) {
          data.kerning[first] = {}
        }
        if (data.glyphs[first] === undefined) {
          const glyph = new Glyph()
          glyph.offset = data.default / data.units
          data.glyphs[first] = glyph
        }
        const value = data.kerning[first][second]
        data.glyphs[first].kerning[second] = parseInt(value, 10) / data.units
        data.kerning[first][second] = parseInt(value, 10) / data.units
      })
    })
  }
}
