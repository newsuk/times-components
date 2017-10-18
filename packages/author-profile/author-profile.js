import React from "react";
import PropTypes from "prop-types";
import AuthorHead from "@times-components/author-head";
import { withPageState } from "@times-components/pagination";
import { ArticleListProvider } from "@times-components/provider";
import { withTrackingContext } from "@times-components/tracking";
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

    return (
      <ArticleListProviderWithPageState
        articleImageRatio="3:2"
        slug={slug}
        page={initPage}
        pageSize={initPageSize}
      >
        {({ author: data, onNext, onPrev, page, pageSize }) => (
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

AuthorProfile.defaultProps = {
  isLoading: true,
  error: null,
  author: null,
  page: 1,
  pageSize: 10,
  onTwitterLinkPress: () => {},
  onArticlePress: () => {}
};

AuthorProfile.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.shape(),
  author: PropTypes.shape({
    name: PropTypes.string,
    jobTitle: PropTypes.string,
    biography: AuthorHead.propTypes.bio,
    image: PropTypes.string,
    twitter: PropTypes.string
  }),
  page: PropTypes.number,
  pageSize: PropTypes.number,
  onTwitterLinkPress: PropTypes.func,
  onArticlePress: PropTypes.func,
  slug: PropTypes.string.isRequired
};

export default withTrackingContext(AuthorProfile, {
  trackingObject: "AuthorProfile",
  getAttrs: ({ author, page, pageSize } = {}) => ({
    authorName: author && author.name,
    page,
    pageSize
  })
});
