import React from "react";
import get from "lodash.get";
import { withPageState } from "@times-components/pagination";
import {
  AuthorArticlesNoImagesProvider,
  AuthorArticlesWithImagesProvider
} from "@times-components/provider";
import { ratioTextToFloat } from "@times-components/utils";
import AuthorProfileListContent from "./author-profile-list-content";
import AuthorProfileListPageError from "./author-profile-list-page-error";
import { propTypes, defaultProps } from "./author-profile-prop-types";
import authorProfileTrackingContext from "./author-profile-tracking-context";

const AuthorProfile = ({
  author,
  error,
  isLoading,
  page,
  pageSize: initPageSize,
  onArticlePress,
  onNext,
  onPrev,
  onTwitterLinkPress,
  refetch,
  slug
}) => {
  if (error) {
    return <AuthorProfileListPageError refetch={refetch} />;
  }

  if (isLoading) {
    return (
      <AuthorProfileListContent
        articlesLoading
        imageRatio={ratioTextToFloat("3:2")}
        isLoading
        onTwitterLinkPress={() => {}}
        pageSize={initPageSize}
        refetch={() => {}}
        showImages
      />
    );
  }

  const {
    articles,
    biography,
    hasLeadAssets,
    image: uri,
    jobTitle,
    name,
    twitter
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
        <AuthorProfileListContent
          articles={get(data, "articles.list", [])}
          articlesLoading={articlesLoading}
          biography={biography}
          count={get(articles, "count", 0)}
          error={articlesError}
          imageRatio={ratioTextToFloat(imageRatio)}
          isLoading={isLoading}
          jobTitle={jobTitle}
          name={name}
          onArticlePress={onArticlePress}
          onNext={onNext}
          onPrev={onPrev}
          onTwitterLinkPress={onTwitterLinkPress}
          page={page}
          pageSize={pageSize}
          refetch={refetchArticles}
          showImages={hasLeadAssets}
          twitter={twitter}
          uri={uri}
        />
      )}
    </SelectedProvider>
  );
};

AuthorProfile.propTypes = propTypes;
AuthorProfile.defaultProps = defaultProps;

export default withPageState(authorProfileTrackingContext(AuthorProfile));
