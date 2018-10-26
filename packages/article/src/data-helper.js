import getLeadAsset from "./article-lead-asset/get-lead-asset";

const prepend = ({ data, type }, list) => {
  if (!data) {
    return list;
  }

  return [
    {
      data,
      type
    },
    ...list
  ];
};

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
  const { isVideo, leadAsset } = getLeadAsset(articleData);
  const articleHeaderData = {
    flags: articleData.flags,
    hasVideo: articleData.hasVideo,
    headline: articleData.headline,
    isVideo,
    label: articleData.label,
    shortHeadline: articleData.shortHeadline,
    standfirst: articleData.standfirst
  };
  const articleMidContainerData = {
    byline: articleData.byline,
    publicationName: articleData.publicationName,
    publishedTime: articleData.publishedTime
  };

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
    {
      data: articleHeaderData,
      type: "header"
    },
    {
      data: articleMidContainerData,
      type: "middleContainer"
    },
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

  return prepend(
    {
      data: leadAsset,
      type: "leadAsset"
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

export default prepareDataForListView;
