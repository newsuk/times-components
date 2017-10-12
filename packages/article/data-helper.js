const prepareDataForListView = articleData => {
  const leadAssetData = articleData.leadAsset;
  const articleHeaderData = {
    label: articleData.label,
    title: articleData.title,
    standfirst: articleData.standfirst,
    flags: articleData.flags
  };
  const articleMidContainerData = {
    publicationName: articleData.publicationName,
    publishedTime: articleData.publishedTime,
    byline: articleData.byline
  };

  return [
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
};

export default prepareDataForListView;
