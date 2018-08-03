import PropTypes from "prop-types";

export const renderTree = (tree, renderers, key = "0", indx = 0) => {
  const { name, attributes, children } = tree;

  const renderer = renderers[name];

  if (!renderer) return null;

  const initialResult = renderer(key, attributes, [], indx, tree);
  const { element, shouldRenderChildren = true } = initialResult;

  if (!shouldRenderChildren) return element;

  const renderedChildren = children.map((child, index) =>
    renderTree(child, renderers, `${key}.${index}`, index)
  );
  const result = renderer(key, attributes, renderedChildren, indx, tree);

  return result.element;
};

const nodeShape = {
  name: PropTypes.string.isRequired,
  attributes: PropTypes.object
};

nodeShape.children = PropTypes.arrayOf(PropTypes.shape(nodeShape)).isRequired;

export const propTypes = PropTypes.shape(nodeShape);

export default (trees, renderers) =>
  trees.map((tree, index) => renderTree(tree, renderers, `${index}`, index));
