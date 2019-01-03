const defaultMockTypes = {
  Article: { __typename: "Article" },
  ArticleSlice: {
    __typename: "StandardSlice"
  },
  Author: {
    __typename: "Author"
  },
  DateTime: "2019-01-02",
  Markup: { __typename: "Markup" },
  Media: { __typename: "Image" },
  Ratio: "16:9",
  Slug: "a-slug",
  Topic: { __typename: "Topic" },
  URL: "url",
  UUID: "uuid"
};

export default defaultMockTypes;
