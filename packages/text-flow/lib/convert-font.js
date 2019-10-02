const fs = require('fs');
const Opentype = require('opentype.js');

const convert = (filename, target) => {
  const font = Opentype.loadSync(filename);
  const glyphs = {};
  const kerning = {};
  Object.keys(font.glyphs.glyphs).forEach(index => {
    const inst = font.glyphs.get(index);
    const glyph = inst.unicode;
    glyphs[glyph] = {
      offset: inst.advanceWidth
    };
    Object.keys(font.glyphs.glyphs).forEach(otherI => {
      try {
        const other = font.glyphs.get(otherI).univode;
        const value = font.getKerningValue(index, otherI);
        if (value) {
          if (!glyphs[glyph].kerning) {
            glyphs[glyph].kerning = {};
          }
          glyphs[glyph].kerning[other] = value;
          if (!kerning[glyph]) {
            kerning[glyph] = {};
          }
          kerning[glyph][other] = value;
        }
      } catch (e) {
        return null;
      }
      return null;
    });
  });
  const fontObj = {
    ascent: font.ascender,
    descent: font.descender,
    units: font.unitsPerEm,
    glyphs,
    kerning,
    default: font.tables.head.xMax - font.tables.head.xMin,
    xMax: font.tables.head.xMax
  };
  fs.writeFileSync(
    target,
    `export default ${JSON.stringify(fontObj, null, 2)}`
  );
}

module.exports = convert