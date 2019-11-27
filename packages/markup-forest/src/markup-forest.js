export const render = renderers => {
  const run = (tree, key = "0", indx = 0) => {
    const { name, attributes, children } = tree;
    const renderer = renderers[name] || renderers.unknown;
    if (!renderer) return null;
    const renderedChildren = children.map((child, index) =>
      run(child, `${key}.${index}`, index)
    );
    const result = renderer.call(
      renderers,
      key,
      attributes,
      renderedChildren,
      indx,
      tree
    );
    return result;
  };
  return run;
};

export const renderTree = (tree, renderers, key = 0, indx = 0) =>
  render(renderers)(tree, key, indx);

export const renderTreeAsText = (
  { attributes: { value } = {}, children, name },
  key = "0"
) =>
  (name === "text" && value) ||
  (children
    ? children
        .map((child, index) => renderTreeAsText(child, `${key}.${index}`))
        .join("")
    : "");

export const renderTreeArrayAsText = markupTree =>
  markupTree.map(tree => renderTreeAsText(tree)).join("");

export default (trees, renderers) =>
  trees.map((tree, index) => renderTree(tree, renderers, `${index}`, index));
