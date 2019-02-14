import { MockList } from "graphql-tools";
import { mockEditionSlice } from "@times-components/fixture-generator";
import { nativeEdition as nativeEditionQuery } from "@times-components/provider-queries";
import article from "../fixtures/article.json";

const getMediaUrl = (obj, ratio) => {
  const crop = obj[`crop${ratio.replace(":", "")}`];
  const ratios = {
    "3:2": "300/200",
    "16:9": "320/180"
  };

  return {
    url: crop
      ? crop.url
      : `https://placeimg.com/${ratios[ratio] || "100/100"}/tech`
  };
};

export default ({ variables = () => {} } = {}) => {
  const queryVariables = variables();

  return [
    {
      defaults: {
        types: {
          Article: () => article,
          ArticleSlice: () => ({
            __typename: "StandardSlice",
            items: new MockList(1)
          }),
          Crop: (parent, { ratio }) => {
            if (parent.posterImage) {
              return getMediaUrl(parent.posterImage, ratio);
            }

            return getMediaUrl(parent, ratio);
          },
          DateTime: () => "2018-10-25",
          LeadOneFullWidthSlice: () => ({
            __typename: "LeadOneFullWidthSlice",
            items: mockEditionSlice(1)
          }),
          Markup: (parent, { maxCharCount }) => {
            if (maxCharCount) {
              return parent[`summary${maxCharCount}`] || {};
            }

            // this oddly returns the provided fixture
            return {};
          },
          Media: () => ({ __typename: "Image" }),
          Ratio: () => "16:9",
          Section: () => ({
            __typename: "StandardSection",
            slices: new MockList(1)
          }),
          Slug: () => "some-slug",
          StandardSection: () => ({
            colour: {
              rgba: {
                alpha: 1,
                blue: 255,
                green: 255,
                red: 255
              }
            },
            id: "dummy-section-id",
            slices: [mockEditionSlice(1)],
            slug: "dummy-section-slug",
            title: "News"
          }),
          StandardSectionSlice: () => ({
            __typename: "LeadOneFullWidthSlice",
            items: new MockList(1)
          }),
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
      query: nativeEditionQuery,
      variables: queryVariables
    }
  ];
};
