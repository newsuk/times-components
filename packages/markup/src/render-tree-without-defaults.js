const renderTree = (tree, renderers, key, indx) => {
  const { name, attributes, children } = tree;

  const renderer = renderers[name];

  if (!renderer) return null;

  const initialResult = renderer(key, attributes);

  if (initialResult.shouldIgnoreChildren) return initialResult.element;

  const renderedChildren = children.map((child, index) =>
    renderTree(child, renderers, `${key}.${index}`, index)
  );
  const result = renderer(key, attributes, renderedChildren, indx);
  return result.element;
};
export default renderTree;
