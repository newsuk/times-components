/* eslint-disable no-plusplus */
import memoize from "memoize-one";
import { FontStorage } from "@times-components/typeset";

// Collapse inlines into the following paragraphs on tablet
const collapsed = (isTablet, content) =>
  !isTablet
    ? content
    : content.reduceRight((acc, node) => {
        // backwards
        if (
          (node.name === "image" && node.attributes.display === "inline") ||
          node.name === "pullQuote"
        ) {
          // forwards
          let i;
          let children = [node];
          for (i = 0; i < acc.length; i += 1) {
            const next = acc[i];
            if (next && next.name === "paragraph") {
              children = [
                ...children,
                ...next.children,
                { name: "break", children: [] },
                { name: "break", children: [] }
              ];
            } else {
              break;
            }
          }
          return [
            {
              ...acc[0],
              children
            },
            ...acc.slice(i)
          ];
        }
        return [node, ...acc];
      }, []);

export const getStringBounds = (fontSettings, string) => {
  const { fontSize } = fontSettings;
  const font = FontStorage.getFont(fontSettings);
  const glyphs = font.stringToGlyphs(string);
  let x1 = 0;
  let x2 = 0;
  let y1 = 0;
  let y2 = 0;
  glyphs.forEach(glyph => {
    const bbox = glyph.getBoundingBox();
    x1 = Math.min(x1, bbox.x1);
    x2 = Math.max(x2, bbox.x2) + 100 * (glyphs.length - 1);
    y1 = Math.min(y1, bbox.y1);
    y2 = Math.max(y2, bbox.y2);
  });
  const width =
    (x2 * fontSize) / font.unitsPerEm - (x1 * fontSize) / font.unitsPerEm;
  const height =
    (y2 * fontSize) / font.unitsPerEm - (y1 * fontSize) / font.unitsPerEm;
  return { width, height };
};

export default memoize((isTablet, content) => collapsed(isTablet, content));
