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

const splitNode = (node) => {
  let { children } = node;
  if (children.length === 0) {
    return node
  };
  if (children[0].name === "text") {
    return {
      ...node,
      attributes: {
        ...node.attributes,
      },
      children: [
        {
          ...children[0],
          attributes: {
            ...children[0].attributes,
            value: children[0].attributes.value.slice(0, 1),
            parent: node
          }
        },
        {
          ...children[0],
          attributes: {
            ...children[0].attributes,
            value: children[0].attributes.value.slice(1)
          }
        },
        ...children.slice(1)
      ]
    }
  };
  const firstChild = splitNode(children[0])
  if (firstChild.attributes.dropCap && node.name !== 'paragraph') {
    const result = {
      ...node,
      attributes: {
        ...node.attributes,
        parent: node
      },
      children: [firstChild, ...children.slice(1)]
    }
    firstChild.attributes.parent = result
    return result
  } else {
    const result = {
      ...node,
      children: [firstChild, ...children.slice(1)]
    }
    firstChild.attributes.parent = result
    return result
  }
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
    const withCap = splitNode(children[0])
    return [
      {
        name: 'dropCap',
        attributes: {},
        children: [
          withCap.children[0]
        ]
      },
      withCap,
      ...children.slice(1)
    ]
  }
  return children;
};

export default insertDropcapIntoAST;
