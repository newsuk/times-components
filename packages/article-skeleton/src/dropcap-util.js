/* eslint-disable no-param-reassign */
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
    const without = splitNode(children[0]);
    let childs = withCap.children;
    while (childs[0].attributes.dropCap && childs[0].name !== "text") {
      childs = childs[0].children;
    }
    childs.splice(1);
    childs = without.children;
    while (childs[0].attributes.dropCap && childs[0].name !== "text") {
      childs = childs[0].children;
    }
    childs.splice(0, 1);
    return [
      {
        name: "dropCap",
        attributes: {},
        children: [withCap]
      },
      without,
      ...children.slice(1)
    ];
  }
  return children;
};

export default insertDropcapIntoAST;
