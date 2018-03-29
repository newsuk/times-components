export default function getMainRelatedArticleId(relatedArticlesLayout) {
  return (
    relatedArticlesLayout.lead ||
    relatedArticlesLayout.main ||
    relatedArticlesLayout.opinion ||
    ""
  );
}
