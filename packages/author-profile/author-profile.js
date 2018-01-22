import React from "react";
import PropTypes from "prop-types";
import AuthorHead from "@times-components/author-head";
import { withPageState } from "@times-components/pagination";
import { AuthorArticlesWithImagesProvider } from "@times-components/provider";
import { withTrackingContext } from "@times-components/tracking";
import { ratioTextToFloat } from "@times-components/utils/strings";
import get from "lodash.get";
import AuthorArticlesNoImagesProvider from "./author-profile-list-provider";
import AuthorProfileError from "./author-profile-error";
import AuthorProfileContent from "./author-profile-content";

const AuthorProfile = ({
  author,
  error,
  refetch,
  isLoading,
  onArticlePress,
  onTwitterLinkPress,
  page,
  onNext,
  onPrev,
  pageSize: initPageSize,
  slug
}) => {
  if (error) {
    return <AuthorProfileError refetch={refetch} />;
  }

  if (isLoading) {
    return (
      <AuthorProfileContent
        isLoading
        showImages
        pageSize={initPageSize}
        imageRatio={ratioTextToFloat("3:2")}
        articlesLoading
        onTwitterLinkPress={() => {}}
        refetch={() => {}}
      />
    );
  }

  const {
    biography,
    name,
    image: uri,
    jobTitle,
    twitter,
    hasLeadAssets,
    articles
  } =
    author || {};

  const SelectedProvider = hasLeadAssets
    ? AuthorArticlesWithImagesProvider
    : AuthorArticlesNoImagesProvider;

  return (
    <SelectedProvider
      articleImageRatio="3:2"
      slug={slug}
      page={page}
      pageSize={initPageSize}
    >
      {({
        author: data,
        pageSize,
        isLoading: articlesLoading,
        error: articlesError,
        refetch: refetchArticles,
        variables: { imageRatio = "3:2" }
      }) => (
        <AuthorProfileContent
          isLoading={isLoading}
          name={name}
          biography={biography}
          uri={uri}
          error={articlesError}
          refetch={refetchArticles}
          jobTitle={jobTitle}
          twitter={twitter}
          onTwitterLinkPress={onTwitterLinkPress}
          count={get(articles, "count", 0)}
          onNext={onNext}
          onPrev={onPrev}
          page={page}
          pageSize={pageSize}
          imageRatio={ratioTextToFloat(imageRatio)}
          showImages={hasLeadAssets}
          articlesLoading={articlesLoading}
          articles={get(data, "articles.list", [])}
          onArticlePress={onArticlePress}
        />
      )}
    </SelectedProvider>
  );
};

AuthorProfile.defaultProps = {
  author: null,
  error: null,
  isLoading: true,
  onArticlePress: () => {},
  onTwitterLinkPress: () => {},
  page: 1,
  onNext: () => {},
  onPrev: () => {},
  pageSize: 10,
  refetch: () => {}
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
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  pageSize: PropTypes.number,
  onTwitterLinkPress: PropTypes.func,
  onArticlePress: PropTypes.func,
  slug: PropTypes.string.isRequired,
  refetch: PropTypes.func
};

const AuthorProfileWithTracking = withTrackingContext(AuthorProfile, {
  getAttrs: ({ author, page, pageSize } = {}) => ({
    authorName: author && author.name,
    page,
    pageSize,
    articlesCount: get(author, "articles.count", 0)
  }),
  trackingObject: "AuthorProfile",
  isDataReady: ({ isLoading }) => !isLoading
});

export default withPageState(AuthorProfileWithTracking);
