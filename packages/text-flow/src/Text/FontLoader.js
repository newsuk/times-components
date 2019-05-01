/* eslint-disable default-case,no-param-reassign,no-underscore-dangle */
import Font from "./Font";
import Glyph from "./Glyph";
import fonts from "./fonts";

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

  static loadFont(fontName) {
    // determine if font exists in memory
    if (fontName in FontLoader.fonts) {
      // loading complete
      return
      // load from scratch
    }
    const font = new Font();
    FontLoader.fonts[fontName] = font;

    if (!(fontName in fonts)) {
      throw new Error(`Unknown font: ${fontName}`);
    }

    const lines = fonts[fontName].split("\n");
    const len = lines.length;
    let i = 0;
    let line;
    let glyph;
    while (i < len) {
      line = lines[i].split("|");
      switch (line[0]) {
        case "0": {
          // properties
          if (
            line[1] === "id" ||
            line[1] === "panose" ||
            line[1] === "family" ||
            line[1] === "font-style" ||
            line[1] === "font-stretch"
          ) {
            const { "2": line2 } = line;
            font[line[1]] = line2;
          } else {
            const { "2": line2 } = line;
            font[line[1]] = parseInt(line2, 10);
          }
          break;
        }
        case "1": {
          // glyphs
          glyph = new Glyph();
          glyph.offset = parseInt(line[2], 10) / font.units;
          const { "3": line3 } = line;
          glyph.path = line3;
          font.glyphs[line[1]] = glyph;
          break;
        }
        case "2":
          // kerning
          if (font.kerning[line[1]] === undefined) {
            font.kerning[line[1]] = {};
          }
          if (font.glyphs[line[1]] === undefined) {
            glyph = new Glyph();
            glyph.offset = font.default / font.units;
            glyph.path = "";
            font.glyphs[line[1]] = glyph;
          }
          font.glyphs[line[1]].kerning[line[2]] =
            parseInt(line[3], 10) / font.units;
          font.kerning[line[1]][line[2]] = parseInt(line[3], 10) / font.units;
          break;

        case "3": {
          line.shift();
          const lineLen = line.length;
          for (let j = 0; j < lineLen; j += 1) {
            const path = line[j].split("");
            const pathLength = path.length;
            let target = font.ligatures;
            for (let k = 0; k < pathLength; k += 1) {
              if (target[path[k]] === undefined) {
                target[path[k]] = {};
              }
              if (k === pathLength - 1) {
                target[path[k]].glyph = font.glyphs[line[j]];
              }

              target = target[path[k]];
            }
            // font.ligatures[ line[ j ] ] = font.glyphs[ line[j] ]
          }
          break;
        }
      }
      i += 1;
    }
    // character cloning
    // clone bullet into multiple areas
    font.cloneGlyph(183, 8226);
    font.cloneGlyph(8729, 8226);
    font.cloneGlyph(12539, 8226);
    font.cloneGlyph(9702, 8226);
    font.cloneGlyph(9679, 8226);
    font.cloneGlyph(9675, 8226);

    // define font adjustment values for font.top, font.middle, font.bottom
    if (font.top === undefined) {
      font.top = 0;
    }
    if (font.middle === undefined) {
      font.middle = 0;
    }
    if (font.bottom === undefined) {
      font.bottom = 0;
    }

    // level the font metadata
    font.loaded = true;
    font.targets = [];
  }
}
