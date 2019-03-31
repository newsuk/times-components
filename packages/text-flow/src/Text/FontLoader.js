import Font from './Font';
import Glyph from './Glyph';
import fonts from './fonts'

export default class FontLoader {

  static path = "/font/";

  static cache = false;

  static version = 0;

  static fonts = {};

  static loaders = [];

  constructor(props = {}) {
    Object.assign(this, props);
  }

  static isLoaded(name) {
    if (FontLoader.fonts.hasOwnProperty(name)) {
      return FontLoader.fonts[name].loaded;
    }
    return false;
  }

  static getFont(name) {
    if (FontLoader.fonts.hasOwnProperty(name)) {
      return FontLoader.fonts[name];
    }
    return null;
  }

  static load(target, fonts) {
    //no loaderId implies no loading for this txt field
    var loader;
    if (target.loaderId == null) {
      loader = {
        _id: null,
        _target: null
      };
      target.loaderId = FontLoader.loaders.push(loader) - 1;
      loader._id = target.loaderId;
      loader._target = target;
    } else {
      loader = FontLoader.loaders[target.loaderId];
    }
    var fontCount = fonts.length;
    for (var i = 0; i < fontCount; ++i) {
      //mark loader for font loading
      loader[fonts[i]] = false;
    }
    for (var prop in loader) {
      if (prop.charAt(0) != "_") {
        FontLoader.loadFont(prop, loader);
      }
    }
  }

  static check(id) {
    var loader = FontLoader.loaders[id];
    //determine if all fonts are loaded
    for (var prop in loader) {
      if (prop.charAt(0) != "_") {
        loader[prop] = FontLoader.isLoaded(prop)
        if (loader[prop] == false) return;
      }
    }
  }

  static loadFont(fontName, loader) {
    //determine if font exists in memory
    if (FontLoader.fonts.hasOwnProperty(fontName)) {

      //loading complete
      if (FontLoader.fonts[fontName].loaded === true) {
        FontLoader.check(loader._id);

        //loading not complete
      } else {
        //add loader id to font
        FontLoader.fonts[fontName].targets.push(loader._id);
      }

      //load from scratch
    } else {
      var font = FontLoader.fonts[fontName] = new Font()
      font.targets.push(loader._id);

      if (!(fontName in fonts)) {
        throw new Error(`Unknown font: ${fontName}`)
      }

      var lines = fonts[fontName].split('\n');
      var len = lines.length;
      var i = 0;
      var line;
      var glyph;
      while (i < len) {
        line = lines[i].split("|");
        switch (line[0]) {

          case '0':
            //properties
            if (line[1] == 'id' || line[1] == 'panose' || line[1] == 'family' || line[1] == 'font-style' || line[1] == 'font-stretch') {
              font[line[1]] = line[2];
            } else {
              font[line[1]] = parseInt(line[2]);
            }
            break;

          case '1':
            //glyphs
            glyph = new Glyph();
            glyph.offset = parseInt(line[2]) / font.units;
            glyph.path = line[3];
            font.glyphs[line[1]] = glyph;
            break;

          case '2':
            //kerning                            
            if (font.kerning[line[1]] == undefined) {
              font.kerning[line[1]] = {};
            }
            if (font.glyphs[line[1]] == undefined) {
              glyph = new Glyph();
              glyph.offset = font.default / font.units;
              glyph.path = '';
              font.glyphs[line[1]] = glyph;
            }
            font.glyphs[line[1]].kerning[line[2]] = parseInt(line[3]) / font.units;
            font.kerning[line[1]][line[2]] = parseInt(line[3]) / font.units;
            break;

          case '3':
            line.shift();
            var lineLen = line.length;
            for (var j = 0; j < lineLen; j++) {
              var path = line[j].split("");
              var pathLength = path.length;
              var target = font.ligatures;
              for (var k = 0; k < pathLength; k++) {
                if (target[path[k]] == undefined) {
                  target[path[k]] = {}
                }
                if (k == pathLength - 1) {
                  target[path[k]].glyph = font.glyphs[line[j]]
                }

                target = target[path[k]];
              }
              //font.ligatures[ line[ j ] ] = font.glyphs[ line[j] ]
            }
            break;
        }
        i++;
      }
      //character cloning
      //clone bullet into multiple areas
      font.cloneGlyph(183, 8226);
      font.cloneGlyph(8729, 8226);
      font.cloneGlyph(12539, 8226);
      font.cloneGlyph(9702, 8226);
      font.cloneGlyph(9679, 8226);
      font.cloneGlyph(9675, 8226);

      //define font adjustment values for font.top, font.middle, font.bottom
      if (font.top == undefined) {
        font.top = 0;
      }
      if (font.middle == undefined) {
        font.middle = 0;
      }
      if (font.bottom == undefined) {
        font.bottom = 0;
      }

      //level the font metadata
      var lLen = font.targets.length;
      font.loaded = true;
      for (var l = 0; l < lLen; ++l) {
        FontLoader.check(font.targets[l]);
      }
      font.targets = [];
    }
  }
}