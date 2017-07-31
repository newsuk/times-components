import React from "react";
import { ScrollView, Text } from "react-native";
import gql from "graphql-tag";
// import AuthorProfile from "@times-components/author-profile";
import connectGraphql from "./provider";

const query = gql`
  query ArticleQuery($slug: Slug!, $first: Int, $skip: Int, $imageRatio: Ratio!) {
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

const propsToVariables = ({ slug, pageSize, pageNumber, imageRatio }) => ({
  slug,
  first: pageSize,
  skip: pageSize * (pageNumber - 1),
  imageRatio
});

export default connectGraphql(query, propsToVariables)(props =>
  <ScrollView>
    <Text>{JSON.stringify(props, null, 2)}</Text>
  </ScrollView>
);
// export default connectGraphql(query, propsToVariables)(AuthorProfile);
