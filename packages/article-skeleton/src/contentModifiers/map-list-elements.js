// This function maps over the content to remove list elements from
// being rendered inside paragraphs as this is invalid HTML.
// It returns an array with the list elements not being a child of a paragraph.

function mapListElements(children) {
  const newContent = children.map(child => {
    if (child.name === "paragraph" || child.name === "paywall") {
      if (child.name === "paywall") {
        // If the child is a paywall, we need to transform the lists sitting one level deeper
        const newChildren = mapListElements(child.children);
        return {
          ...child,
          children: newChildren
        };
      }
      if (
        child.children.length === 1 &&
        child.children[0].name === "unorderedList"
      ) {
        return {
          ...child.children[0]
        };
      }
    }
    return child;
  });
  return newContent;
}

export default mapListElements;
