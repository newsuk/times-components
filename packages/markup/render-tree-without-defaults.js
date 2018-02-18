const renderTree = (tree, renderers, key, indx) => {
  const { name, attributes, children } = tree;

  const renderer = renderers[name];
  if (!renderer) return null;

  const renderedChildren = children.map((child, index) =>
    renderTree(child, renderers, `${key}.${index}`, index)
  );
  return renderer(key, attributes, renderedChildren, indx);
};
export default renderTree;
