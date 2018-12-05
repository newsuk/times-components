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
  let child = children;
  if (name === "text") {
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
    child = [dropCapElement, newTextElement, ...children.slice(1)];
  }
  return child;
};

const insertDropcapIntoAST = (firstContentChild, template) => {
  let child = firstContentChild;
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
  child = { ...child, children: newChildren };
  return child;
};

export default insertDropcapIntoAST;
