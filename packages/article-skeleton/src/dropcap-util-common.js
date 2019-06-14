/* eslint-disable no-param-reassign */
import { Text } from "@times-components/text-flow";

const templateWithDropCaps = [
  "indepth",
  "maincomment",
  "magazinestandard",
  "magazinecomment"
];

const splitNode = node => {
  const { children } = node;
  if (children.length === 0) {
    return node;
  }
  if (children[0].name === "text") {
    return {
      ...node,
      attributes: {
        ...node.attributes
      },
      children: [
        {
          ...children[0],
          attributes: {
            ...children[0].attributes,
            value: children[0].attributes.value.slice(0, 1),
            dropCap: true
          }
        },
        {
          ...children[0],
          attributes: {
            ...children[0].attributes,
            value: children[0].attributes.value.slice(1),
            dropCap: true
          }
        },
        ...children.slice(1)
      ]
    };
  }
  const firstChild = splitNode(children[0]);
  if (firstChild.attributes.dropCap && node.name !== "paragraph") {
    const result = {
      ...node,
      attributes: {
        ...node.attributes,
        dropCap: true
      },
      children: [firstChild, ...children.slice(1)]
    };
    firstChild.attributes.dropCap = true;
    return result;
  }
  const result = {
    ...node,
    children: [firstChild, ...children.slice(1)]
  };
  firstChild.attributes.dropCap = true;
  return result;
};

const findFirstTextNode = children => {
  const child = children[0];
  if (!child) {
    return children;
  }
  if (child.attributes.dropCap && child.name !== "text") {
    return findFirstTextNode(child.children);
  }
  return children;
};

const insertDropcapIntoAST = (children, template, isDropcapDisabled) => {
  if (
    template &&
    templateWithDropCaps.includes(template) &&
    !isDropcapDisabled &&
    children.length > 0 &&
    children[0].name === "paragraph" &&
    children[0].children.length > 0
  ) {
    const withCap = splitNode(children[0]);
    const withoutCap = splitNode(children[0]);

    const newCapChildren = findFirstTextNode(withCap.children);
    newCapChildren.splice(1);

    const newChildren = findFirstTextNode(withoutCap.children);
    newChildren.splice(0, 1);

    return [
      {
        name: "dropCap",
        attributes: {},
        children: [withCap]
      },
      withoutCap,
      ...children.slice(1)
    ];
  }
  return children;
};

export const getDropCap = (children, font, height, markup) => {
  if (children.length === 0) {
    const text = new Text.Text({
      font,
      lineHeight: height,
      markup,
      size: height
    });
    return text.words[0].idealSpans[0];
  }
  const text = children[0];
  if (text.markup[0].style) {
    text.markup[0].style.size = height;
  }
  text.font = font;
  text.lineHeight = height;
  text.size = height;
  text.layout();
  const value = text.words[0].idealSpans[0];
  return value;
};

export const getDropCapValue = node => {
  if (node.href) {
    return node.href(node);
  }
  return node.text;
};

export default insertDropcapIntoAST;
