const flattenChildren = childrenList =>
  childrenList.reduce((acc, children) => [...acc, ...children], []);

const flatten = {
  bold(key, attr, renderedChildren, indx, node) {
    return {
      element: flattenChildren(renderedChildren).map(child => ({
        ...child,
        markup: [node, ...child.markup]
      })),
      shouldRenderChildren: true
    };
  },
  break(key, attr, renderedChildren, indx, node) {
    return {
      element: [
        {
          markup: [node],
          value: "\n"
        }
      ],
      shouldRenderChildren: false
    };
  },
  italic(key, attr, renderedChildren, indx, node) {
    return {
      element: flattenChildren(renderedChildren).map(child => ({
        ...child,
        markup: [node, ...child.markup]
      })),
      shouldRenderChildren: true
    };
  },
  link(key, attr, renderedChildren, indx, node) {
    return {
      element: flattenChildren(renderedChildren).map(child => ({
        ...child,
        markup: [node, ...child.markup]
      })),
      shouldRenderChildren: true
    };
  },
  paragraph(key, attr, renderedChildren, indx, node) {
    return {
      element: flattenChildren(renderedChildren).map(child => ({
        ...child,
        markup: [node, ...child.markup]
      })),
      shouldRenderChildren: true
    };
  },
  text(key, attr, children, indx, node) {
    const text = attr.value;
    return {
      element: text.split(/\s/).map(word => ({
        markup: [node],
        value: word
      })),
      shouldRenderChildren: true
    };
  }
};

export default flatten;
