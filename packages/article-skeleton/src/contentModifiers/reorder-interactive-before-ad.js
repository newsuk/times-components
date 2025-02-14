const reorderInteractiveBeforeAd = content => {
  const paywallElement = content.find(item => item.name === "paywall");

  if (!paywallElement || !Array.isArray(paywallElement.children)) {
    return content;
  }

  const paywallChildren = paywallElement.children;
 
  for (let i = 0; i < paywallChildren.length - 2; i++) {
    if (
      paywallChildren[i].name === "paragraph" && (
        paywallChildren[i + 1].name.includes("inlineAd") || paywallChildren[i + 1].name === "ad"
      )
       &&
      paywallChildren[i + 2].name === "interactive" &&
      paywallChildren[i + 2].attributes.element.value === "times-travel-cta"
    ) {
      [paywallChildren[i + 1], paywallChildren[i + 2]] = [
        paywallChildren[i + 2],
        paywallChildren[i + 1]
      ];
    }
  }

  
  return content;
};

export default reorderInteractiveBeforeAd;
