const renderTree = (tree, renderers, key, indx = 0) => {
  const { name, attributes, children } = tree;

  const newName = name.replace("-", "");
  // console.log(newName);
  const renderer = renderers[newName];
  if (!renderer) return null;

  const renderedChildren = children.map((child, index) =>
    renderTree(child, renderers, `${key}.${index}`, index)
  );
  return renderer(key, attributes, renderedChildren, indx);
};
export default renderTree;
