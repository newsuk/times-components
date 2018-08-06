import getLeadAsset from "./article-lead-asset/get-lead-asset";

const prepend = ({ type, data }, list) => {
  if (!data) {
    return list;
  }

  return [{ type, data }, ...list];
};

const append = ({ type, data }, list) => {
  if (!data) {
    return list;
  }

  return [...list, { type, data }];
};

const prepareDataForListView = articleData => {
  const { isVideo, leadAsset } = getLeadAsset(articleData);
  const articleHeaderData = {
    label: articleData.label,
    headline: articleData.headline,
    standfirst: articleData.standfirst,
    flags: articleData.flags,
    isVideo
  };
  const articleMidContainerData = {
    publicationName: articleData.publicationName,
    publishedTime: articleData.publishedTime,
    byline: articleData.byline
  };
  const relatedArticlesData = articleData.relatedArticles
    ? {
        relatedArticles: articleData.relatedArticles,
        relatedArticlesLayout: articleData.relatedArticlesLayout
      }
    : null;
  const commentsData = {
    articleId: articleData.id,
    commentCount: articleData.commentCount,
    commentsEnabled: articleData.commentsEnabled,
    url: articleData.url
  };

  const data = [
    { type: "header", data: articleHeaderData },
    { type: "middleContainer", data: articleMidContainerData },
    ...articleData.content.map((rowData, index) => {
      const item = {
        type: "articleBodyRow",
        data: Object.assign({}, rowData),
        index
      };
      if (rowData.name === "ad") {
        item.data.attributes = {
          ...item.data.attributes,
          ...{ section: articleData.section, contextUrl: articleData.url }
        };
      }
      return item;
    }),
    { type: "topics", data: { topics: articleData.topics } }
  ];

  return prepend(
    { type: "leadAsset", data: leadAsset },
    append(
      { type: "comments", data: commentsData },
      append({ type: "relatedArticles", data: relatedArticlesData }, data)
    )
  );
};

export default prepareDataForListView;
