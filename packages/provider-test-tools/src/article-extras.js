import { MockList } from "graphql-tools";
import { articleExtras as articleExtrasQuery } from "@times-components/provider-queries";
import article from "../fixtures/article.json";

const convertRatio = ratio => {
  if (ratio === "16:9") {
    return "320_180";
  }

  if (ratio === "3:2") {
    return "300_200";
  }

  return "100_100";
};

const getMediaUrl = (obj, ratio) => {
  const crop = obj[`crop${ratio.replace(":", "")}`];

  return {
    url: crop
      ? crop.url
      : `https://times-static-assets.s3.eu-west-1.amazonaws.com/assets/tech_${convertRatio(
          ratio
        )}.jpg`
  };
};

export default ({
  commentsEnabled = true,
  chooseMedia = () => ({ __typename: "Image" }),
  error = () => {},
  makeArticle = x => x,
  makeRelatedArticle = x => x,
  relatedArticleCount = 3,
  variables = () => {}
}) => {
  const queryVariables = variables();
  let mediaIndex = -1;

  return [
    {
      defaults: {
        types: {
          Article: (parent, { id }) => {
            if (!parent) {
              return makeArticle({
                ...article,
                commentsEnabled,
                id
              });
            }

            return makeRelatedArticle(parent);
          },
          ArticleByline: () => ({
            __typename: "TextByline"
          }),
          ArticleSlice: () => ({
            __typename: "StandardSlice",
            items: new MockList(relatedArticleCount),
            sliceName: "StandardSlice"
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
          Media: () => {
            mediaIndex += 1;

            return chooseMedia(mediaIndex);
          },
          Ratio: () => "16:9",
          Slug: () => "some-slug",
          StandardSlice: () => ({
            __typename: "StandardSlice",
            items: [],
            sliceName: "StandardSlice"
          }),
          Tile: () => ({}),
          URL: () => "https://test.io",
          UUID: () => "a-u-u-i-d"
        }
      },
      error: error(),
      query: articleExtrasQuery,
      variables: queryVariables
    }
  ];
};
