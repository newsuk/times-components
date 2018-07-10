import React from "react";
import get from "lodash.get";
import ArticleList, {
  ArticleListPageError
} from "@times-components/article-list";
import { withPageState } from "@times-components/pagination";
import { TopicArticlesProvider } from "@times-components/provider";
import { ratioTextToFloat } from "@times-components/utils";
import { propTypes, defaultProps } from "./topic-prop-types";
import topicTrackingContext from "./topic-tracking-context";
import TopicHead from "./topic-head";

const Topic = ({
  adConfig,
  error,
  isLoading: isHeaderLoading,
  page,
  pageSize: initPageSize,
  onArticlePress,
  onNext,
  onPrev,
  refetch,
  slug,
  topic
}) => {
  const emptyStateMessage =
    "Unfortunately, there are no articles relating to this topic";

  if (error) {
    return <ArticleListPageError refetch={refetch} />;
  }

  const { name, description } = isHeaderLoading
    ? { name: "", description: "" }
    : topic;

  const articleListHeader = (
    <TopicHead
      description={description}
      isLoading={isHeaderLoading}
      name={name}
    />
  );

  return (
    <TopicArticlesProvider
      articleImageRatio="3:2"
      debounceTimeMs={250}
      page={page}
      pageSize={initPageSize}
      slug={slug}
    >
      {({
        topic: data,
        error: articlesError,
        fetchMore,
        isLoading: articlesLoading,
        pageSize,
        refetch: refetchArticles,
        variables: { imageRatio = "3:2" }
      }) => {
        const fetchMoreArticles = length =>
          fetchMore({
            variables: {
              skip: length
            },
            updateQuery: (prev, { fetchMoreResult }) =>
              fetchMoreResult
                ? {
                    topic: {
                      ...prev.topic,
                      articles: {
                        ...prev.topic.articles,
                        list: [
                          ...prev.topic.articles.list,
                          ...fetchMoreResult.topic.articles.list
                        ]
                      }
                    }
                  }
                : prev
          });

        return (
          <ArticleList
            adConfig={adConfig}
            articleListHeader={articleListHeader}
            articles={get(data, "articles.list", [])}
            articlesLoading={articlesLoading}
            count={get(data, "articles.count", 0)}
            emptyStateMessage={emptyStateMessage}
            error={articlesError}
            fetchMore={fetchMoreArticles}
            imageRatio={ratioTextToFloat(imageRatio)}
            isLoading={isHeaderLoading}
            onArticlePress={onArticlePress}
            onNext={onNext}
            onPrev={onPrev}
            page={page}
            pageSize={pageSize}
            refetch={refetchArticles}
            showImages
          />
        );
      }}
    </TopicArticlesProvider>
  );
};

Topic.propTypes = propTypes;
Topic.defaultProps = defaultProps;

export default withPageState(topicTrackingContext(Topic));
