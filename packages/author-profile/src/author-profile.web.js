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
import Responsive from "@times-components/responsive";
import { ratioTextToFloat } from "@times-components/utils";
import AuthorProfileHead from "./author-profile-head";
import { propTypes, defaultProps } from "./author-profile-prop-types";
import authorProfileTrackingContext from "./author-profile-tracking-context";
import Head from "./head";

const AuthorProfile = ({
  author,
  error,
  isLoading: isHeaderLoading,
  onArticlePress,
  onNext,
  onPrev,
  onTwitterLinkPress,
  page,
  pageSize: initPageSize,
  refetch,
  slug,
  metaDescription
}) => {
  const emptyStateMessage =
    "Unfortunately, there are no articles relating to this author";

  if (error) {
    return <ArticleListPageError refetch={refetch} />;
  }

  const {
    articles,
    biography,
    hasLeadAssets = true,
    image: uri,
    jobTitle,
    name,
    twitter
  } = isHeaderLoading
    ? {
        articles: [],
        image: "",
        jobTitle: "",
        name: "",
        twitter: ""
      }
    : author;

  const articleListHeader = (
    <AuthorProfileHead
      biography={biography}
      isLoading={isHeaderLoading}
      jobTitle={jobTitle}
      name={name}
      onTwitterLinkPress={onTwitterLinkPress}
      twitter={twitter}
      uri={uri}
    />
  );

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
        isLoading: articlesLoading,
        pageSize,
        refetch: refetchArticles,
        fetchMore,
        variables: { imageRatio = "3:2" }
      }) => {
        const fetchMoreArticles = length =>
          fetchMore({
            updateQuery: (prev, { fetchMoreResult }) =>
              fetchMoreResult
                ? {
                    author: {
                      ...prev.author,
                      articles: {
                        ...prev.author.articles,
                        list: [
                          ...prev.author.articles.list,
                          ...fetchMoreResult.author.articles.list
                        ]
                      }
                    }
                  }
                : prev,
            variables: {
              skip: length
            }
          });

        return (
          <Responsive>
            <Head
              metaDescription={metaDescription}
              description={biography}
              name={name}
            />
            <ArticleList
              articleListHeader={articleListHeader}
              articles={get(data, "articles.list", [])}
              articlesLoading={articlesLoading}
              count={get(articles, "count", 0)}
              emptyStateMessage={emptyStateMessage}
              error={articlesError}
              fetchMore={fetchMoreArticles}
              imageRatio={ratioTextToFloat(imageRatio)}
              onArticlePress={onArticlePress}
              onNext={onNext}
              onPrev={onPrev}
              page={page}
              pageSize={pageSize}
              refetch={refetchArticles}
              showImages={hasLeadAssets}
            />
          </Responsive>
        );
      }}
    </SelectedProvider>
  );
};

AuthorProfile.propTypes = propTypes;
AuthorProfile.defaultProps = defaultProps;

export default withPageState(authorProfileTrackingContext(AuthorProfile));
