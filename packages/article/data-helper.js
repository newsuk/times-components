const prepareDataForListView = articleData => {
  const leadAssetData = articleData.leadAsset;
  const articleHeaderData = {
    label: articleData.label,
    headline: articleData.headline,
    standfirst: articleData.standfirst,
    flags: articleData.flags
  };
  const articleMidContainerData = {
    publicationName: articleData.publicationName,
    publishedTime: articleData.publishedTime,
    byline: articleData.byline
  };

  const data = [
    { type: "leadAsset", data: leadAssetData },
    { type: "header", data: articleHeaderData },
    { type: "middleContainer", data: articleMidContainerData }
  ].concat(
    articleData.content.map((i, index) => ({
      type: "articleBodyRow",
      data: i,
      index
    }))
  );

  if (!leadAssetData) {
    data.splice(0, 1);
  }

  return data;
};

export default prepareDataForListView;
