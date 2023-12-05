const insertInlineAd = children => {
  const clonedChildren = [...children];
  const child = clonedChildren.find(item => item.name === "paywall");
  const paragraph = clonedChildren.filter(item => item.name === "paragraph");

  if (!child) {
    return clonedChildren;
  }

  const paywallChildren = child.children;
  const paywallParagraphs = paywallChildren
    .map((item, index) => ({ ...item, index }))
    .filter(item => item.name === "paragraph");
  const paraPostition = [13, 20, 27];

  paraPostition.forEach((item, i) => {
    const inlineAd = paywallChildren.find(ad => ad.name === `inlineAd${i + 1}`);
    if (!inlineAd) {
      const indexPos = paywallParagraphs[item - paragraph.length]
        ? paywallParagraphs[item - paragraph.length].index
        : null;

      if (indexPos && indexPos !== null) {
        paywallChildren.splice(indexPos + i, 0, {
          name: `inlineAd${i + 1}`,
          children: []
        });
      }
    }
  });

  return clonedChildren;
};

export default insertInlineAd;
