const append = ({ data, type }, list) => {
  if (!data) {
    return list;
  }

  return [
    ...list,
    {
      data,
      type
    }
  ];
};

const prepareDataForListView = articleData => {
  const relatedArticleSliceData = articleData.relatedArticleSlice
    ? {
        relatedArticleSlice: {
          ...articleData.relatedArticleSlice,
          sliceName: articleData.relatedArticleSlice.__typename // eslint-disable-line no-underscore-dangle
        }
      }
    : null;
  const commentsData = {
    articleId: articleData.id,
    commentCount: articleData.commentCount,
    commentsEnabled: articleData.commentsEnabled,
    url: articleData.url
  };

  const data = [
    ...articleData.content.map((rowData, index) => {
      const item = {
        data: Object.assign({}, rowData),
        index,
        type: "articleBodyRow"
      };
      if (rowData.name === "ad") {
        item.data.attributes = {
          ...item.data.attributes,
          ...{
            contextUrl: articleData.url,
            section: articleData.section
          }
        };
      }
      return item;
    }),
    {
      data: {
        topics: articleData.topics
      },
      type: "topics"
    }
  ];

  return append(
    {
      data: commentsData,
      type: "comments"
    },
    append(
      {
        data: relatedArticleSliceData,
        type: "relatedArticleSlice"
      },
      data
    )
  );
};

export default prepareDataForListView;
