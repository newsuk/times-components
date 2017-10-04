const renderTree = (tree, renderers, key) => {
  const { name, attributes, children } = tree;

  const renderer = renderers[name];
  if (!renderer) return null;

  const renderedChildren = children.map((child, index) =>
    renderTree(child, renderers, `${key}.${index}`)
  );
  return renderer(key, attributes, renderedChildren);
};
export default renderTree;
