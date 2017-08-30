import get from "lodash.get";
import gql from "graphql-tag";
import { Platform } from "react-native";
import AuthorProfile from "@times-components/author-profile";
import connectGraphql from "./connect";

const query = gql`
  query ArticleQuery(
    $slug: Slug!
    $first: Int
    $skip: Int
    $imageRatio: Ratio!
  ) {
    author(slug: $slug) {
      name
      jobTitle
      biography
      image
      twitter
      url
      articles {
        count
        list(first: $first, skip: $skip) {
          id
          title
          label
          publicationName
          publishedTime
          leadAsset {
            ... on Image {
              title
              crop(ratio: $imageRatio) {
                url
              }
            }
            ... on Video {
              posterImage {
                title
                crop(ratio: $imageRatio) {
                  url
                }
              }
            }
          }
          teaser
        }
      }
    }
  }
`;

const propsToVariables = ({ slug, pageSize, page, imageRatio }) => ({
  slug,
  first: pageSize,
  skip: pageSize * (page - 1),
  imageRatio
});

const transformResponse = response => {
  const resolve = url => {
    if (Platform.OS === "web") {
      return url;
    }

    if (url.indexOf("//") !== 0) {
      return url;
    }

    return `https:${url}`;
  };

  const author = get(response, "data.author");
  if (author) {
    return {
      data: Object.assign(
        {},
        Object.assign({}, author, {
          articles: {
            count: author.articles.count,
            list: author.articles.list.map(article => {
              if (get(article, "leadAsset.crop.url", null)) {
                return {
                  ...article,
                  publishedTime: new Date(article.publishedTime),
                  leadAsset: {
                    ...article.leadAsset,
                    crop: {
                      ...article.leadAsset.crop,
                      url: resolve(article.leadAsset.crop.url)
                    }
                  }
                };
              }

              if (get(article, "leadAsset.posterImage.crop.url", null)) {
                return {
                  ...article,
                  publishedTime: new Date(article.publishedTime),
                  leadAsset: {
                    ...article.leadAsset,
                    posterImage: {
                      ...article.leadAsset.posterImage,
                      crop: {
                        ...article.leadAsset.posterImage.crop,
                        url: resolve(article.leadAsset.posterImage.crop.url)
                      }
                    }
                  }
                };
              }

              return {
                ...article,
                publishedTime: new Date(article.publishedTime)
              };
            })
          }
        }),
        {
          count: get(response, "data.author.articles.count"),
          pageSize: 10,
          page: 1
        }
      ),
      error: null,
      isLoading: false
    };
  }

  return {
    error: get(response, "data.error", null),
    isLoading: get(response, "data.loading", true),
    data: null
  };
};

export default connectGraphql(query, propsToVariables, transformResponse)(
  AuthorProfile
);
