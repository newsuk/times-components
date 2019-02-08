import { MockList } from "graphql-tools";
import { edition as editionQuery } from "@times-components/provider-queries";
import article from "../fixtures/article.json";

const convertRatio = ratio => {
  if (ratio === "16:9") {
    return "320/180";
  }

  if (ratio === "3:2") {
    return "300/200";
  }

  return "100/100";
};

const getMediaUrl = (obj, ratio) => {
  const crop = obj[`crop${ratio.replace(":", "")}`];

  return {
    url: crop ? crop.url : `https://placeimg.com/${convertRatio(ratio)}/tech`
  };
};

export default ({ variables = () => {} } = {}) => {
  const queryVariables = variables();
  const sliceCount = 2;

  return [
    {
      defaults: {
        types: {
          Article: () => article,
          ArticleSlice: () => ({
            __typename: "StandardSlice",
            items: new MockList(sliceCount)
          }),
          Crop: (parent, { ratio }) => {
            if (parent.posterImage) {
              return getMediaUrl(parent.posterImage, ratio);
            }

            return getMediaUrl(parent, ratio);
          },
          DateTime: () => "2018-10-25",
          Markup: (parent, { maxCharCount }) => {
            if (maxCharCount) {
              return parent[`summary${maxCharCount}`] || {};
            }

            // this oddly returns the provided fixture
            return {};
          },
          Media: () => ({ __typename: "Image" }),
          Ratio: () => "16:9",
          Slug: () => "some-slug",
          StandardSlice: () => ({
            __typename: "StandardSlice",
            items: []
          }),
          Tile: () => ({}),
          URL: () => "https://test.io",
          UUID: () => "a-u-u-i-d"
        }
      },
      error: null,
      query: editionQuery,
      variables: queryVariables
    }
  ];
};
