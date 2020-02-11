/* eslint-disable no-plusplus */
import memoize from "memoize-one";
import { FontStorage } from "@times-components/typeset";

// Handle the case where jounralist nest paragraph breaks inside styling markup
const liftBreaks = paragraph => {
  const children = paragraph.children.slice();
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const breaks = (child.children || []).filter(c => c.name === "break");
    if (breaks.length > 1) {
      children.splice(
        i,
        1,
        ...breaks.concat({
          ...child,
          children: (child.children || []).filter(c => c.name !== "break")
        })
      );
    }
  }
  return {
    ...paragraph,
    children
  };
};

// Handle the case where journalists put everything in one paragraph
const splitHuge = paragraph => {
  const children = paragraph.children.reduceRight((acc, node) => {
    const next = acc[0];
    if (next && next.name === "break" && node.name === "break") {
      const text = acc.slice(1).filter(n => n.name !== "paragraph");
      return [
        {
          name: "paragraph",
          attributes: {},
          children: text
        },
        ...acc.slice(text.length + 1)
      ];
    }
    return [node, ...acc];
  }, []);
  const wasSplit = children.filter(n => n.name === "paragraph").length > 0;
  if (wasSplit) {
    const text = children.filter(n => n.name !== "paragraph");
    return [
      {
        name: "paragraph",
        attributes: {},
        children: text
      },
      ...children.slice(text.length)
    ];
  }
  return [paragraph];
};

const split = content =>
  [].concat(
    ...content.map(node => {
      if (node.name === "paragraph") {
        return splitHuge(liftBreaks(node));
      }
      return [node];
    })
  );

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

export default memoize((isTablet, content) =>
  collapsed(isTablet, split(content))
);
