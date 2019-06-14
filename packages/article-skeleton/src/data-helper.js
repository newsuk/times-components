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
    ? { relatedArticleSlice: articleData.relatedArticleSlice }
    : null;
  const commentsData = {
    articleId: articleData.id,
    commentCount: articleData.commentCount,
    commentsEnabled: articleData.commentsEnabled,
    url: articleData.url
  };

  const data = articleData.content
    ? [
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
      ]
    : [];

  return append(
    {
      data: { articleId: articleData.id, articleUrl: articleData.url },
      type: "articleExtrasRow"
    },
    append(
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
    )
  );
};

export const getRegistrationType = () => {
  const user = (global.nuk && global.nuk.user) || {};
  return user && user.registrationType ? user.registrationType : "";
};

export const getSharedStatus = () => {
  const user = (global.nuk && global.nuk.user) || {};
  return user && user.isShared ? "yes" : "no";
};

export default prepareDataForListView;
