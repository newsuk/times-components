import { formatRelatedArticles } from "@times-components/ts-components";

const getInlineRelatedArticles = (attributes = {}) => ({
  name: "autoInlineRelatedArticles",
  attributes: {
    element: {
      value: "inline-related-articles",
      attributes
    }
  },
  children: []
});

const insertInlineRelatedArticles = relatedArticleSlice => articleContent => {
  const paywall = articleContent.find(item => item.name === "paywall");
  if (!paywall) return articleContent;

  const insertIndex = 7;

  const outsidePaywallParagraphs = articleContent.filter(
    item => item.name === "paragraph"
  );
  const insidePaywallParagraphs = paywall.children.filter(
    item => item.name === "paragraph"
  );

  console.log("xxx outsidePaywallParagraphs", outsidePaywallParagraphs);
  console.log("xxx insidePaywallParagraphs", insidePaywallParagraphs);

  if (outsidePaywallParagraphs.length >= insertIndex) {
    const afterParagraph = outsidePaywallParagraphs[insertIndex - 1];
    const outsidePaywallIndex = articleContent.indexOf(afterParagraph);

    return [
      ...articleContent.slice(0, outsidePaywallIndex + 1),
      getInlineRelatedArticles({
        backgroundColor: "#ffbbbb",
        info: "Outside Paywall",
        paywallParagraphs: outsidePaywallParagraphs.length,
        relatedArticles: formatRelatedArticles(relatedArticleSlice)
      }),
      ...articleContent.slice(outsidePaywallIndex + 1)
    ];
  }
  const afterParagraph =
    insidePaywallParagraphs[insertIndex - outsidePaywallParagraphs.length - 1];
  const insidePaywallIndex = paywall.children.indexOf(afterParagraph);

  return articleContent.map(
    item =>
      item !== paywall
        ? item
        : {
            ...paywall,
            children: [
              ...paywall.children.slice(0, insidePaywallIndex + 1),
              getInlineRelatedArticles({
                backgroundColor: "#ffee99",
                info: "Inside Paywall",
                paywallParagraphs: outsidePaywallParagraphs.length,
                relatedArticles: formatRelatedArticles(relatedArticleSlice)
              }),
              ...paywall.children.slice(insidePaywallIndex + 1)
            ]
          }
  );
};

export default insertInlineRelatedArticles;
