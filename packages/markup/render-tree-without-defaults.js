// text nodes have a single child that isnt a node (it's { text: "something"}),
// so we turn the child text into an attribute
// needed until https://github.com/newsuk/times-public-api/pull/104 is live
const fixIfTextNode = ({ name, attributes, children }) => {
  if (name === "text" && children.length === 1) {
    const value = children[0].text;
    return {
      name,
      attributes: Object.assign({}, attributes, { value }),
      children: []
    };
  }
  return { name, attributes, children };
};

const renderTree = (tree, renderers, key) => {
  const { name, attributes, children } = fixIfTextNode(tree);

  const renderer = renderers[name];
  if (!renderer) return null;

  const renderedChildren = children.map((child, index) =>
    renderTree(child, renderers, `${key}.${index}`)
  );
  return renderer(key, attributes, renderedChildren);
};
export default renderTree;
