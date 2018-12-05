const templateWithDropCaps = [
  "maincomment",
  "magazinestandard",
  "magazinecomment"
];

const insertDropcap = (firstTextChild, children) => {
  const {
    name,
    attributes: { value }
  } = firstTextChild;
  if (name === "text" && value.trim().length > 0) {
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

const insertDropcapIntoAST = (firstContentChild, template) => {
  const child = firstContentChild;
  const { name, children } = child;
  let newChildren = children;
  if (
    template &&
    templateWithDropCaps.includes(template) &&
    name === "paragraph" &&
    children.length > 0
  ) {
    newChildren = insertDropcap(children[0], children);
  }
  return { ...child, children: newChildren };
};

export default insertDropcapIntoAST;
