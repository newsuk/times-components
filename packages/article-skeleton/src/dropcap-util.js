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

export const hasDropcap = (child, template, isDropcapDisabled) => {
  const { name, children } = child;
  if (
    template &&
    templateWithDropCaps.includes(template) &&
    !isDropcapDisabled &&
    name === "paragraph" &&
    children.length > 0
  ) {
    return true
  }
  return false;
};

const insertDropcapIntoAST = (child, template, isDropcapDisabled) => {
  const { children } = child;
  if (hasDropcap(child, template, isDropcapDisabled)) {
    return { ...child, children: insertDropcap(children[0], children) };
  }
  return child;
};

export default insertDropcapIntoAST;
