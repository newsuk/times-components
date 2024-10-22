const insertInlineAd = isPreview => children => {
  const clonedChildren = [...children];
  let adIndex;

  const getChild = () => {
    if (isPreview) {
      adIndex = clonedChildren.findIndex(item => item.name === "ad");
      return { children: clonedChildren.slice(adIndex) };
    }
    return clonedChildren.find(item => item.name === "paywall");
  };

  const child = getChild();
  const paragraph = isPreview
    ? clonedChildren.slice(0, adIndex).filter(item => item.name === "paragraph")
    : clonedChildren.filter(item => item.name === "paragraph");

  if (!child) {
    return clonedChildren;
  }

  const paywallChildren = child.children;
  const paywallParagraphs = paywallChildren
    .map((item, index) => ({ ...item, index }))
    .filter(item => item.name === "paragraph");

  // remove last paragraph to stop ads being appended to the end of the article
  paywallParagraphs.pop();

  // insert AFTER these positions - so insert in positions 10, 15, 20, 25
  const paraPostition = [9, 14, 19, 24];

  paraPostition.forEach((item, i) => {
    const inlineAd = paywallChildren.find(ad => ad.name === `inlineAd${i + 1}`);
    if (!inlineAd) {
      const indexPos = paywallParagraphs[item - paragraph.length]
        ? paywallParagraphs[item - paragraph.length].index
        : null;

      if (indexPos && indexPos !== null) {
        paywallChildren.splice(indexPos + i + 1, 0, {
          name: `inlineAd${i + 1}`,
          children: []
        });
      }
    }
  });
  return isPreview
    ? [...children.slice(0, adIndex), ...paywallChildren]
    : clonedChildren;
};

export default insertInlineAd;
