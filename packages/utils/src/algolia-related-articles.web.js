const formatRelatedArticle = article => ({
  article: {
    id: article.id,
    url: article.url,
    // leadAsset: article.leadAsset,
    label: article.label,
    section: article.section,
    hasVideo: article.hasVideo,
    headline: article.headline,
    shortHeadline: article.shortHeadline,
    // bylines: article.byline,
    publishedTime: article.publishedTime,
    // summary105: article.content,
    summary125: []
    // summary145: article.content,
    // summary160: article.content,
    // summary175: article.content,
    // ssummary225: article.content,
  }
});

const searchRelatedArticles = async (index, article) => {
  if (index) {
    const search = await index.search("EU AstraZeneca Covid vaccine", { hitsPerPage: 5 });

    return {
      sliceName: "StandardSlice",
      items: search.hits
        .filter(({ id }) => id !== article.id)
        .map(formatRelatedArticle)
        .filter((item, i) => i < 3)
    };
  }

  return null;
};

export default searchRelatedArticles;
