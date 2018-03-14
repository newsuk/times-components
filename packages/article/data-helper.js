import getLeadAsset from "./get-lead-asset";

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

  const data = [
    { type: "leadAsset", data: leadAsset },
    { type: "header", data: articleHeaderData },
    { type: "middleContainer", data: articleMidContainerData }
  ].concat(
    articleData.content.map((rowData, index) => {
      const item = {
        type: "articleBodyRow",
        data: Object.assign({}, rowData),
        index
      };
      if (rowData.name === "ad") {
        item.data.attributes = {
          ...item.data.attributes,
          ...{ section: articleData.section }
        };
      }
      return item;
    })
  );

  if (relatedArticlesData) {
    data.push({ type: "relatedArticles", data: relatedArticlesData });
  }

  if (!leadAsset) {
    data.splice(0, 1);
  }

  return data;
};

export default prepareDataForListView;
