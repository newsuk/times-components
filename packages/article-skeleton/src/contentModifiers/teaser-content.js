export const removeContentFromTeaserPage = removeTeaserContent => children => {
  if (removeTeaserContent) {
    if (children.find(child => child.name === "paywall") === undefined) {
      return [];
    }
  }

  return children;
};
