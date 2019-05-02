/* eslint-disable no-param-reassign */
const templateWithDropCaps = [
  "indepth",
  "maincomment",
  "magazinestandard",
  "magazinecomment"
];

const insertDropcap = (firstTextChild, children) => {
  const { name, attributes } = firstTextChild;
  if (
    attributes &&
    attributes.value &&
    name === "text" &&
    attributes.value.trim().length > 0
  ) {
    const { value } = attributes;
    const dropCapElement = {
      attributes: {
        value: value.slice(0, 1)
      },
      children: [],
      name: "dropCap"
    };
    const newTextElement = {
      attributes: {
        value: value.slice(1, value.length)
      },
      children: [],
      name: "text"
    };
    return [dropCapElement, newTextElement, ...children.slice(1)];
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
    const firstTextChild = children[0].children[0];
    const [dropcap, ...rest] = insertDropcap(
      firstTextChild,
      children[0].children
    );
    children[0].children = rest;
    return [dropcap, ...children];
  }
  return children;
};

export default insertDropcapIntoAST;
