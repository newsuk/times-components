import { MockList } from "graphql-tools";
import { article as articleQuery } from "@times-components/provider-queries";
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

export default ({
  chooseMedia = () => ({ __typename: "Image" }),
  error = () => {},
  makeArticle = x => x,
  makeRelatedArticle = x => x,
  relatedArticleCount = 3,
  variables = () => {}
}) => {
  const queryVariables = variables();
  let articleIndex = -1;
  let mediaIndex = -1;

  return [
    {
      defaults: {
        types: {
          Article: (parent, { id }) => {
            if (!parent) {
              return makeArticle({
                ...article,
                id
              });
            }

            articleIndex += 1;

            return makeRelatedArticle(
              article.relatedArticleSlice.items[articleIndex],
              articleIndex
            );
          },
          ArticleSlice: () => ({
            __typename: "StandardSlice",
            items: new MockList(relatedArticleCount)
          }),
          Crop: (parent, { ratio }) => {
            const relatedArticle =
              article.relatedArticleSlice.items[articleIndex];

            if (relatedArticle && relatedArticle.leadAsset) {
              const crop =
                relatedArticle.leadAsset[`crop${ratio.replace(":", "")}`];

              return {
                url: crop
                  ? crop.url
                  : `https://placeimg.com/${convertRatio(ratio)}/tech`
              };
            }

            return {
              url: `https://placeimg.com/${convertRatio(ratio)}/tech`
            };
          },
          Markup: (parent, { maxCharCount }) => {
            if (maxCharCount && articleIndex >= 0 && articleIndex <= 3) {
              return article.relatedArticleSlice.items[articleIndex][
                `summary${maxCharCount}`
              ];
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
            items: []
          }),
          UUID: () => "a-u-u-i-d"
        }
      },
      error: error(),
      query: articleQuery,
      variables: queryVariables
    }
  ];
};
