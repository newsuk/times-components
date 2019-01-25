import React from "react";
import { Text } from "react-native";
import formatter from "./formatter";
import linebreak, { infinity } from "./knuth";

export default function align(
  begin,
  text,
  inlines,
  type,
  initialLength,
  tolerance,
  center,
  maxLength
) {
  const format = formatter(text);
  const nodes = format[type](text);
  let lineLengths = [];
  for (let i = 0; i < inlines.length; i += 1) {
    const { start, height: inlineHeight, width } = inlines[i];
    while (lineLengths.length < start) {
      lineLengths.push(initialLength);
    }
    const end = start + Math.floor(inlineHeight / text[0].height);
    while (lineLengths.length <= end) {
      lineLengths.push(initialLength - width);
    }
  }
  lineLengths = lineLengths.slice(begin);
  lineLengths.push(initialLength);
  const breaks = linebreak(nodes, lineLengths, { tolerance });
  if (breaks.length !== 0) {
    const lines = [];
    let lineStart = 0;
    for (let i = 1; i < breaks.length; i += 1) {
      const point = breaks[i].position;
      const r = breaks[i].ratio;
      for (let j = lineStart; j < nodes.length; j += 1) {
        // After a line break, we skip any nodes unless they are boxes or forced breaks.
        if (
          nodes[j].type === "box" ||
          (nodes[j].type === "penalty" && nodes[j].penalty === -infinity)
        ) {
          lineStart = j;
          break;
        }
      }
      lines.push({
        nodes: nodes.slice(lineStart, point + 1),
        position: point,
        ratio: r
      });
      lineStart = point;
    }
    let { height } = text[0];
    let y = -height + begin * height;
    let lineIndex = 0;
    const results = [];
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      let x = 0;
      const lineLength =
        lineIndex < lineLengths.length
          ? lineLengths[lineIndex]
          : lineLengths[lineLengths.length - 1];
      if (center) {
        x += (maxLength - lineLength) / 2;
      }

      height = (i !== 0 ? lines[i - 1] : line).nodes.reduce((acc, node) => {
        if (node.type === "box" && text[node.index].height > acc) {
          return text[node.index].height;
        }
        return acc;
      }, 0);
      y += height;

      let hasInline = false;
      for (let j = 0; j < inlines.length; j += 1) {
        const {
          start,
          height: inlineHeight,
          width,
          align: inlineAlign,
          children
        } = inlines[j];
        const end = start + Math.floor(inlineHeight / height);
        if (lineIndex + begin >= start && lineIndex + begin <= end) {
          hasInline = { align: inlineAlign, children, end, start, width };
          break;
        }
      }

      if (hasInline && hasInline.align === "left") {
        if (lineIndex + begin === hasInline.start) {
          results.push(
            hasInline.children({
              height: (hasInline.end + 1 - hasInline.start) * height,
              left: x,
              position: "absolute",
              top: y,
              width: hasInline.width
            })
          );
        }
        x += hasInline.width;
      }

      if (hasInline && hasInline.align === "right") {
        if (lineIndex + begin === hasInline.start) {
          results.push(
            hasInline.children({
              height: (hasInline.end + 1 - hasInline.start) * height,
              left: lineLengths[lineIndex],
              position: "absolute",
              top: y,
              width: hasInline.width
            })
          );
        }
      }

      const array = line.nodes;
      const span = [];
      let nHeight;
      let style;
      for (let index = 0; index < array.length; index += 1) {
        const node = array[index];
        const { value, height: nodeHeight, index: nodeIndex } = node;
        const { style: nStyle } = text[nodeIndex] || { style: null };
        if (node.type === "box") {
          span.push(value);
          nHeight = nodeHeight;
          style = nStyle;
        }
      }

      results.push(
        <Text
          key={lineIndex}
          style={{
            ...style,
            height: nHeight,
            left: hasInline ? initialLength - lineLength : 0,
            position: "absolute",
            top: y,
            width: lineLength
          }}
        >
          {span.join(" ")}
        </Text>
      );
      lineIndex += 1;
    }
    results.push(lines.length);
    return results;
  }
  return [];
}
