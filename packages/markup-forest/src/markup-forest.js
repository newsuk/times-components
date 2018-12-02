import PropTypes from "prop-types";

const templateWithDropCaps = [
  "maincomment",
  "magazinestandard",
  "magazinecomment"
];

const mutateAST = (firstTextChild, children) => {
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

export const renderTree = (tree, renderers, key = "0", indx = 0, template) => {
  const { name, attributes, children } = tree;
  let newChildren = children;
  if (
    template &&
    templateWithDropCaps.includes(template) &&
    indx === 0 &&
    name === "paragraph" &&
    children.length > 0
  ) {
    // mutate AST
    newChildren = mutateAST(children[0], children);
  }

  const renderer = renderers[name];

  if (!renderer) return null;

  tree.children = newChildren;

  const initialResult = renderer(key, attributes, [], indx, tree);
  const { element, shouldRenderChildren = true } = initialResult;

  if (!shouldRenderChildren) return element;

  const renderedChildren = newChildren.map((child, index) =>
    renderTree(child, renderers, `${key}.${index}`, index)
  );
  const result = renderer(key, attributes, renderedChildren, indx, tree);

  return result.element;
};

export const renderTreeAsText = (
  { attributes: { value } = {}, children },
  key = "0"
) =>
  value ||
  children
    .map((child, index) => renderTreeAsText(child, `${key}.${index}`))
    .join("");

const nodeShape = {
  attributes: PropTypes.object,
  name: PropTypes.string.isRequired
};

nodeShape.children = PropTypes.arrayOf(PropTypes.shape(nodeShape)).isRequired;

export const propTypes = PropTypes.shape(nodeShape);

export default (trees, renderers, template) =>
  trees.map((tree, index) =>
    renderTree(tree, renderers, `${index}`, index, template)
  );
