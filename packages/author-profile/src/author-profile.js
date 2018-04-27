import React from "react";
import { withPageState } from "@times-components/pagination";
import { AuthorArticlesWithImagesProvider } from "@times-components/provider";
import { ratioTextToFloat } from "@times-components/utils";
import get from "lodash.get";
import AuthorArticlesNoImagesProvider from "./author-profile-list-provider";
import AuthorProfileError from "./author-profile-error";
import AuthorProfileContent from "./author-profile-content";
import { propTypes, defaultProps } from "./author-profile-prop-types";
import authorProfileTrackingContext from "./author-profile-tracking-context";

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
      debounceTimeMs={250}
      page={page}
      pageSize={initPageSize}
      slug={slug}
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

AuthorProfile.propTypes = propTypes;
AuthorProfile.defaultProps = defaultProps;

export default withPageState(authorProfileTrackingContext(AuthorProfile));
