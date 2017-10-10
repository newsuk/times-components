import React from "react";
import PropTypes from "prop-types";
import { withPageState } from "@times-components/pagination";
import { ArticleListProvider } from "@times-components/provider";
import get from "lodash.get";
import AuthorProfileEmpty from "./author-profile-empty";
import AuthorProfileError from "./author-profile-error";
import AuthorProfileLoading from "./author-profile-loading";
import AuthorProfileContent from "./author-profile-content";

const AuthorProfile = ({
  isLoading,
  error,
  author,
  page: initPage,
  pageSize: initPageSize,
  onTwitterLinkPress,
  onArticlePress,
  slug
}) => {
  if (error) {
    return <AuthorProfileError {...error} />;
  }

  if (isLoading) {
    return <AuthorProfileLoading />;
  }

  if (author) {
    const { biography, name, uri, jobTitle, twitter } = author;
    const ArticleListProviderWithPageState = withPageState(ArticleListProvider);

    debugger;
    return (
      <ArticleListProviderWithPageState
        articleImageRatio={"3:2"}
        slug={slug}
        page={initPage}
        pageSize={initPageSize}
      >
        {({
          author: data,
          onNext,
          onPrev,
          page,
          pageSize,
          isLoading,
          error
        }) => (
          <AuthorProfileContent
            name={name}
            biography={biography}
            uri={uri}
            jobTitle={jobTitle}
            twitter={twitter}
            onTwitterLinkPress={onTwitterLinkPress}
            count={get(data, "articles.count")}
            onNext={onNext}
            onPrev={onPrev}
            page={page}
            pageSize={pageSize}
            articles={get(data, "articles.list", []).map(article => ({
              ...article,
              publishedTime: new Date(article.publishedTime)
            }))}
            onArticlePress={onArticlePress}
          />
        )}
      </ArticleListProviderWithPageState>
    );
  }

  return <AuthorProfileEmpty />;
};

export default AuthorProfile;
