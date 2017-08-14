import get from "lodash.get";
import gql from "graphql-tag";
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
  const author = get(response, "data.author");
  if (author) {
    return {
      data: Object.assign(
        {},
        {
          ...author,
          articles: {
            count: author.articles.count,
            list: author.articles.list.map(article => ({
              ...article,
              publishedTime: new Date(article.publishedTime)
            }))
          }
        },
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
