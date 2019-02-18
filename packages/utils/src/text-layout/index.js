/* eslint-disable react/no-array-index-key */
import React from "react";
import { Text, View } from "react-native";
import align from "./align";
import InlineElement from "./inlineElement";
import styles from "./styles";

export { default as InlineElement } from "./inlineElement";

export const measureContainer = children => (
  <View style={styles.container}>{children}</View>
);

export const measureText = texts => {
  const els = [];
  const promises = texts.map(
    (text, i) =>
      new Promise(resolve => {
        els.push(
          React.cloneElement(text, {
            ...text.props,
            key: i,
            onLayout: e => {
              const result = {
                height: e.nativeEvent.layout.height,
                style: text.props.style,
                value: text.props.children,
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

export function measureElements(childElements) {
  const children = Array.isArray(childElements)
    ? childElements
    : [childElements];
  const inlines = children.filter(el => el.type === InlineElement);
  const textEls = children.filter(el => typeof el.props.children === "string");

  const splitEls = textEls.reduce(
    (acc, el) =>
      acc.concat(
        el.props.children
          .trim()
          .split(/\s/)
          .concat([" "])
          .map((word, i) => (
            <Text key={String(i)} style={el.props.style}>
              {word}
            </Text>
          ))
      ),
    []
  );

  const { elements: wordElements, results: wordsResults } = measureText(
    splitEls
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
    elements: wordElements.concat(inlineElements),
    results
  };
}

export const layoutText = (width, { inlines, words, inlineSizes }) => {
  const inlineElements = [];
  for (let i = 0; i < inlines.length; i += 1) {
    inlineElements.push({
      ...inlines[i].props,
      ...inlineSizes[i]
    });
  }

  const paragraphs = [[]];
  for (let i = 0; i < words.length; i += 1) {
    const word = words[i];
    if (word.value === " ") {
      paragraphs[paragraphs.length - 1].push(word);
      paragraphs.push([]);
    }
    paragraphs[paragraphs.length - 1].push(word);
  }

  let lines = 0;
  const result = [];
  let height = 0;
  for (let i = 0; i < paragraphs.length; i += 1) {
    let paragraph = paragraphs[i];
    let tolerance = 1;
    if (paragraph[0].value === " ") {
      paragraph = paragraph.slice(1);
    }
    while (!result.length) {
      const nodes = align(
        lines,
        paragraph,
        inlineElements,
        "left",
        width,
        tolerance
      );
      for (let j = 0; j < nodes.length; j += 1) {
        const node = nodes[j];
        if (typeof node === "number") {
          lines += node + 1;
        } else {
          result.push(node);
        }
      }
      tolerance += 1;
    }
    height = paragraph[0].height * lines;
    break;
  }
  return [result, height];
};
