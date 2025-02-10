
export default (children) => {
  const newContent = children.map(child => {
    if(child.name === "paragraph") {
      if(child.children.length === 1 && child.children[0].name === "unorderedList") {
        return {
          ...child.children[0],
        };
      }
    }
    return child;
  });
  return newContent;
};
