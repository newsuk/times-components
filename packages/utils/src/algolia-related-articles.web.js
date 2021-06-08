import get from "lodash.get";

import { stripTags } from "./strings";

const getDateDaysAgo = days => Date.now() - days * 1000 * 60 * 60 * 24;

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

const formatByLines = bylines =>
  bylines &&
  bylines.length === 1 &&
  bylines[0].byline
    .map(({ children }) =>
      children.map(({ attributes }) => attributes.value).join(" ")
    )
    .join(" ");

const search = async (
  index,
  { id: articleId, bylines, topics, headline, section, label },
  analyticsStream,
  limitDays
) => {
  const byline = formatByLines(bylines);

  const topicSearch = topics
    ? topics
      .map(
        topic =>
          topic.name.indexOf(" ") >= 0
            ? `"${topic.name.toLowerCase()}"`
            : topic.name.toLowerCase()
      )
      .join(" ")
    : "";

  const headlineSearch = `${headline}`.replace(/[.,()"':;{}[]/g, "");

  const query = `${headlineSearch} ${topicSearch} ${
    byline ? `"${byline.toLowerCase()}"` : ""
  }`.replace(/\s{2,}/g, " ");

  const optionalWords = query
    .match(/\w+|"[^"]+"/g) // match by single or quoted words
    .map(word => word.replace(/"/g, "")) // then remove the quotes
    .filter(word => !word.match(/^[A-Z].*/))
    .filter(word => word && word.length > 0);

  const filterSection = section && section !== "" ? [`section:${section}`] : [];
  const filterId = articleId ? [`NOT objectID:${articleId}`] : [];
  const publishedDateFilter = limitDays
    ? [`algoliaData.publishedTimestamp >= ${getDateDaysAgo(3)}`]
    : [];

  const filters = [...filterSection, ...filterId, ...publishedDateFilter].join(
    " AND "
  );

  const searchOptions = {
    hitsPerPage: 3,
    ignorePlurals: true,
    removeStopWords: true,
    optionalWords,
    filters,
    optionalFilters: label && [`label:${label}`],
    typoTolerance: false
  };

  const results = await index.search(query, searchOptions);
  analyticsStream({
    object: "AlgoliaSearchProvider",
    action: "Search",
    attr: { query, searchOptions, results }
  });

  return results;
};

const searchRelatedArticles = async (index, article, analyticsStream) => {
  try {
    let searchResults = await search(index, article, analyticsStream, 7);

    // pass 2 - any section
    if (searchResults.hits.length === 0) {
      searchResults = await search(index, { ...article, section: undefined });
    }

    // pass 3 - lowercase headline to make all words optional
    if (searchResults.hits.length === 0) {
      searchResults = await search(index, {
        ...article,
        headline: article.headline.toLowerCase()
      });
    }

    if (searchResults.hits.length > 0)
      return {
        query: searchResults.query,
        sliceName: "StandardSlice",
        items: searchResults.hits.map(formatArticle),
        count: searchResults.nbHits
      };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
  return null;
};

export default searchRelatedArticles;
