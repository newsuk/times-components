const insertNativeAd = children => {
  const clonedChildren = [...children];
  const child = clonedChildren.find(item => item.name === "paywall");
  const paragraph = clonedChildren.filter(x => x.name === "paragraph");

  if (!child) {
    return clonedChildren;
  }

  const paragraphCount = Number(9 - paragraph.length);
  const paywallChildren = child.children;
  const paragraphItems = paywallChildren
    .map((item, index) => ({ ...item, index }))
    .filter(item => item.name === "paragraph");
  const indexToAdd = paragraphItems[paragraphCount]
    ? paragraphItems[paragraphCount].index
    : null;
  // checks if nativeAd only renders once
  const nativeAd = paywallChildren.find(item => item.name === "nativeAd");

  if (nativeAd) {
    return clonedChildren;
  }

  if (indexToAdd && indexToAdd !== null) {
    paywallChildren.splice(indexToAdd, 0, {
      name: "nativeAd",
      children: []
    });
  }

  return clonedChildren;
};

export default insertNativeAd;
