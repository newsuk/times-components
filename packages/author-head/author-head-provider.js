import get from "lodash.get";
import connectGraphql from "@times-components/provider";
import AuthorHeadComponent from "./author-head-component";
import query from "./query";

const transformResponse = response => {
  const author = get(response, "data.author");
  if (author) {
    return {
      data: {
        bio: author.biography,
        name: author.name,
        uri: author.image,
        title: author.jobTitle,
        twitter: author.twitter
      },
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

export default connectGraphql(query, (props) => props, transformResponse)(AuthorHeadComponent);
