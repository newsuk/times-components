import pick from "lodash.pick";

const prepareDataForListView = articleData => {
  const leadAssetData = pick(articleData, ["leadAsset"]);
  const articleHeaderData = pick(articleData, [
    "label",
    "title",
    "standfirst",
    "flags"
  ]);

  const articleMidContainerData = pick(articleData, [
    "publicationName",
    "publishedTime",
    "byline"
  ]);

  return [
    { type: "leadAsset", data: leadAssetData },
    { type: "header", data: articleHeaderData },
    { type: "middleContainer", data: articleMidContainerData }
  ].concat(
    articleData.content.map(i => ({
      type: "article_body_row",
      data: i
    }))
  );
};

export default prepareDataForListView;
