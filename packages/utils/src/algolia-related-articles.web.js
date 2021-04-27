import get from "lodash.get";

import { stripTags } from "./strings";

const formatSummaryContent = (article, length) => {
  const summary = stripTags(article.content, " ").trim();
  return summary.substring(0, summary.lastIndexOf(" ", length));
};

const formatSummary = (article, length) => [
  {
    children: [
      {
        attributes: { value: formatSummaryContent(article, length) },
        children: [],
        name: "text"
      }
    ],
    name: "paragraph"
  }
];

const formatImage = (article, ratio) =>
  get(article, "leadAsset.crop.ratio") === ratio
    ? { url: get(article, "leadAsset.crop.url") }
    : undefined;

const formatArticle = article => ({
  article: {
    id: article.id,
    url: article.url,
    leadAsset: {
      id: get(article, "leadAsset.id"),
      title: get(article, "leadAsset.title"),
      crop169: formatImage(article, "16:9")
    },
    label: article.label,
    section: article.section,
    hasVideo: article.hasVideo,
    headline: article.headline,
    shortHeadline: article.shortHeadline,
    bylines: [{ byline: article.byline }],
    publishedTime: article.publishedTime,
    summary125: formatSummary(article, 125),
    summary145: formatSummary(article, 145)
  }
});

const formatQuery = article => {
  let query = "";
  if (article.label) query = query.concat(" ", article.label);
  if (article.section) query = query.concat(" ", article.section);
  if (article.topics)
    query = article.topics.reduce((acc, t) => acc.concat(" ", t.name), query);

  return query.trim();
};

const searchRelatedArticles = async (index, article) => {
  if (index) {
    const query = formatQuery(article);
    console.log("AlgoliaSearch query", query); // eslint-disable-line no-console
    const search = await index.search(query, { hitsPerPage: 5 });

    if (search.hits.length > 0)
      return {
        query,
        sliceName: "StandardSlice",
        items: search.hits
          .filter(({ id }) => id !== article.id)
          .filter((a, i) => i < 3)
          .map(formatArticle)
      };
  }

  return null;
};

export default searchRelatedArticles;
