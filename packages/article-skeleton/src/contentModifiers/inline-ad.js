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

  paraPostition.map((item, i) => {

    const indexPos = paywallParagraphs[item - paragraph.length]
    ? paywallParagraphs[item - paragraph.length].index
    : null;

    // checks that inlineAd only renders once
    const inlineAd = paywallChildren.find(ad => ad.name === `inlineAd${i + 1}`);

    if (inlineAd) {
      return clonedChildren;
    }
    
    if(indexPos && indexPos !== null) {
      paywallChildren.splice(indexPos + i, 0, {
        name: `inlineAd${i + 1}`,
        children: []
      })
    }

    return true;
  });

  return clonedChildren;
};

export default insertInlineAd;
