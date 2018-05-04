import React from "react";
import get from "lodash.get";
import ArticleList, {
  ArticleListPageError
} from "@times-components/article-list";
import { withPageState } from "@times-components/pagination";
import {
  AuthorArticlesNoImagesProvider,
  AuthorArticlesWithImagesProvider
} from "@times-components/provider";
import { ratioTextToFloat } from "@times-components/utils";
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
    return <ArticleListPageError refetch={refetch} />;
  }

  if (isLoading || !author) {
    return (
      <ArticleList
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
  } = author;

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
        error: articlesError,
        pageSize,
        refetch: refetchArticles,
        variables: { imageRatio = "3:2" }
      }) => (
        <ArticleList
          articles={get(data, "articles.list", [])}
          biography={biography}
          count={get(articles, "count", 0)}
          error={articlesError}
          imageRatio={ratioTextToFloat(imageRatio)}
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
