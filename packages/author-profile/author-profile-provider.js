import get from "lodash.get";
import React from "react";
import { AuthorProfileProvider } from "@times-components/provider";
import { withPageState } from "@times-components/pagination";
import AuthorProfile from "./author-profile";

const AuthorProfileWithPageState = withPageState(AuthorProfileProvider);
export default props =>
  <AuthorProfileWithPageState {...props}>
    {({ error, loading, result, ...extras }) => {
      if (result.author) {
        const author = Object.assign(
          {},
          Object.assign({}, result.author, {
            articles: {
              count: get(result, "author.articles.count", 0),
              list: get(result, "author.articles.list", []).map(article => ({
                ...article,
                publishedTime: new Date(article.publishedTime)
              }))
            }
          }),
          {
            count: get(result, "author.articles.count")
          }
        );

        return (
          <AuthorProfile
            error={error}
            loading={loading}
            data={author}
            {...extras}
          />
        );
      }
      return <AuthorProfile error={error} loading={loading} {...extras} />;
    }}
  </AuthorProfileWithPageState>;
