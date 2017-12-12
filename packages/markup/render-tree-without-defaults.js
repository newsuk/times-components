const renderTree = (tree, renderers, key, indx = 0) => {
  const { name, attributes, children } = tree;

  // To cope with hyphenated names from the API
  const renderFunction = name.replace("-", "");

  const renderer = renderers[renderFunction];
  if (!renderer) return null;

  const renderedChildren = children.map((child, index) =>
    renderTree(child, renderers, `${key}.${index}`, index)
  );
  return renderer(key, attributes, renderedChildren, indx);
};
export default renderTree;
