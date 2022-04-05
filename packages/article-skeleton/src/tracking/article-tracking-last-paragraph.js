const tagLastParagraph = content => {
  const paywall = content.find(item => item.name === "paywall");
  if (!paywall) return content;
  const lastPaywallParagraph = paywall.children
    .filter(({ name }) => name === "paragraph")
    .pop();
  const lastParagraphIndex = paywall.children.indexOf(lastPaywallParagraph);

  const paywallChildren = paywall.children.map(
    (child, index) =>
      index === lastParagraphIndex
        ? {
            ...child,
            attributes: { ...child.attributes, id: "last-paragraph" }
          }
        : child
  );
  return content.map(
    child =>
      child.name === "paywall"
        ? {
            ...child,
            children: paywallChildren
          }
        : child
  );
};
export default tagLastParagraph;
