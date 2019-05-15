const defaultMockTypes = {
  Article: { __typename: "Article" },
  ArticleByline: {
    __typename: "TextByline"
  },
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
  TinyInt: 123,
  Topic: { __typename: "Topic" },
  UnitInterval: 0.5,
  URL: "url",
  User: "user",
  UUID: "uuid"
};

export default defaultMockTypes;
