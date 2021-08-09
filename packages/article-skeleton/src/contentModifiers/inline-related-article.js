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

const insertInlineRelatedArticles = (
  relatedArticleSlice,
  inlineRelatedArticlesFlag,
  { afterParagraph = 7, paragraphPadding = 2 } = {}
) => articleContent => {
  if (!inlineRelatedArticlesFlag) return articleContent;
  const paywall = articleContent.find(item => item.name === "paywall");

  if (!paywall) return articleContent;

  const allArticleContent = [...articleContent, ...paywall.children].filter(
    item => item.name !== "paywall"
  );

  const nthParagraph = allArticleContent.filter(
    item => item.name === "paragraph"
  )[afterParagraph - 1];

  const allArticleContentIndex = allArticleContent.indexOf(nthParagraph);

  const enoughParagraphPadding =
    allArticleContent
      .slice(
        allArticleContentIndex - paragraphPadding + 1,
        allArticleContentIndex + paragraphPadding + 1
      )
      .filter(item => item.name === "paragraph").length ===
    2 * paragraphPadding;

  if (enoughParagraphPadding) {
    if (articleContent.includes(nthParagraph)) {
      const outsidePaywallIndex = articleContent.indexOf(nthParagraph);

      return [
        ...articleContent.slice(0, outsidePaywallIndex + 1),
        getInlineRelatedArticles({
          relatedArticles: formatRelatedArticles(relatedArticleSlice)
        }),
        ...articleContent.slice(outsidePaywallIndex + 1)
      ];
    }
    const insidePaywallIndex = paywall.children.indexOf(nthParagraph);
    return articleContent.map(
      item =>
        item !== paywall
          ? item
          : {
              ...paywall,
              children: [
                ...paywall.children.slice(0, insidePaywallIndex + 1),
                getInlineRelatedArticles({
                  relatedArticles: formatRelatedArticles(relatedArticleSlice)
                }),
                ...paywall.children.slice(insidePaywallIndex + 1)
              ]
            }
    );
  }
  return articleContent.map(
    item =>
      item !== paywall
        ? item
        : {
            ...paywall,
            children: [
              ...paywall.children,
              getInlineRelatedArticles({
                relatedArticles: formatRelatedArticles(relatedArticleSlice)
              })
            ]
          }
  );
};

export default insertInlineRelatedArticles;
