import PropTypes from "prop-types";

const mutateAST = (firstTextChild, children) => {
  const {name, attributes : { value }} = firstTextChild;
  console.log('before', children);
  let child = [];
  if(name === 'text') {
    const firstWord = value.slice(0,1);
    const secondString = value.slice(1, value.length);

    console.log('mutateAST1', firstWord, 'sec:   ',secondString);

    let dropCapElement = {
      name: "DropCap",
      attributes: {
        value: firstWord
      },
      children: []
    };
    console.log('dropCapElement', dropCapElement);
    let newTextElement = {
      name: "text",
      attributes: {
        value: secondString
      },
      children: []
    };
    console.log('newTextElement', newTextElement);

    child.push(dropCapElement);
    child.push(newTextElement);
  }
  const newChild = children.slice(1);
  const child2 = child.concat(newChild);
  console.log('after', child2);
  return child2;
};

export const renderTree = (tree, renderers, key = "0", indx = 0, template) => {
  const { name, attributes, children } = tree;
  let newChildren = children;

  if(template && indx === 0 && name === 'paragraph' && children.length > 0) {
    //mutate AST
    newChildren = mutateAST(children[0], children);
  }

  const renderer = renderers[name];

  if (!renderer) return null;

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
  trees.map((tree, index) => {
    console.log('index', index);
    return renderTree(tree, renderers, `${index}`, index, template)
  });
