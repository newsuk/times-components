/* eslint-disable react/no-array-index-key */
import React from "react";
import { Text, View } from "react-native";
import linebreak, { box, glue, penalty } from "./knuth";
import styles from "./styles";
import { infinity } from "../dist/knuth";

export { default as InlineElement } from "./inlineElement";
export { default as FlowText } from "./wrap-text";

export const measureContainer = children => (
  <View style={styles.container}>{children}</View>
);

export const measureText = (texts, style) => {
  const els = [];
  const promises = texts.map(
    (text, i) =>
      new Promise(resolve => {
        els.push(
          <Text
            key={i}
            onLayout={e => {
              const result = {
                ...text,
                width: e.nativeEvent.layout.width
              };
              resolve(result);
            }}
            style={style}
          >
            {text.value}
          </Text>
        );
      })
  );
  return {
    elements: els,
    results: Promise.all(promises)
  };
};

export const measureInline = elements => {
  const els = [];
  const promises = elements.map(
    (el, i) =>
      new Promise(resolve => {
        els.push(
          React.cloneElement(el, {
            key: `inline-${i}`,
            onLayout: e => {
              const result = {
                height: e.nativeEvent.layout.height,
                width: e.nativeEvent.layout.width
              };
              resolve(result);
            }
          })
        );
      })
  );
  return {
    elements: els,
    results: Promise.all(promises)
  };
};

export function measureElements(inlines, markup, style) {
  const { elements: wordElements, results: wordsResults } = measureText(
    markup,
    style
  );
  const {
    elements: inlineElements,
    results: inlineSizesResults
  } = measureInline(inlines.map(el => el.props.children({})));

  const results = Promise.all([wordsResults, inlineSizesResults]).then(
    ([words, inlineSizes]) => ({
      inlines,
      inlineSizes,
      words
    })
  );

  return {
    elements: inlineElements.concat(wordElements),
    results
  };
}

const newline = () => [glue(0, infinity, 0), penalty(0, -infinity, 1)];

const space = () => [glue(0, 12, 0), penalty(0, 0, 0), glue(10, -12, 0)];

export const layoutText = (maxWidth, { words, inlineSizes }, style) => {
  const { lineHeight } = style;
  const lines = inlineSizes.reduce((acc, { width, height }) => {
    const number = Math.round(height / lineHeight);
    const offsets = [];
    for (let i = 0; i <= number; i += 1) {
      offsets.push(maxWidth - width);
    }
    return [...acc, ...offsets];
  }, []);
  lines.push(maxWidth);

  const boxes = words.reduce((acc, word, i, array) => {
    if (word.value === "\n") {
      return [...acc, ...newline()];
    }
    const prev = array[i - 1];
    if (prev) {
      const prevParagraph = prev.markup[0];
      if (prevParagraph !== word.markup[0]) {
        return [
          ...acc,
          ...newline(),
          box({
            markup: [],
            value: "",
            width: 1
          }),
          ...newline(),
          box(word),
          space()
        ];
      }
    }
    return [
      ...acc,
      box(word),
      ...(i === array.length - 1 ? [...newline()] : [...space()])
    ];
  }, []);

  const breaks = linebreak(boxes, lines);

  const segments = breaks.reduce((acc, { position }, i, array) => {
    if (i === 0) {
      return acc;
    }
    const { position: previousPosition } = array[i - 1];
    return [
      ...acc,
      boxes
        .slice(previousPosition, position)
        .filter(({ type }) => type === "box")
    ];
  }, []);

  const inlines = segments.slice(0, lines.length - 1);
  const rest = segments.slice(lines.length - 1);

  const combined = [inlines, rest].map(s =>
    s.map(segment =>
      segment.reduce((accum, word) => {
        const same =
          accum.markup
            .map((node, i) => node === word.markup[i])
            .filter(isEqual => isEqual).length === word.markup.length;
        if (same) {
          return {
            ...accum,
            value: `${accum.value} ${word.value}`
          };
        }
        return {
          ...word,
          prev: accum
        };
      })
    )
  );

  const mergedLines = combined.map(c =>
    c.map(line => {
      let array = [line];
      let current = line;
      while (current.prev) {
        current = current.prev;
        array = [current, ...array];
      }
      return array;
    })
  );

  const nested = mergedLines.map(m =>
    m.map(segment =>
      segment.reduce(
        (accum, word) => [
          ...accum,
          word.markup.reduceRight((acc, markup) => {
            if (markup.name === "text") {
              return {
                ...markup,
                attributes: {
                  value: word.value
                }
              };
            }
            if (markup.name === "paragraph") {
              return {
                ...acc,
                paragraph: markup
              };
            }
            return {
              ...markup,
              children: [acc]
            };
          }, {})
        ],
        []
      )
    )
  );

  return nested;
};
