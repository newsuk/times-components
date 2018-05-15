import React from "react";
import get from "lodash.get";
import ArticleList, {
  ArticleListPageError
} from "@times-components/article-list";
import TopicHead from "./topic-head";
import { withPageState } from "@times-components/pagination";
import { TopicArticlesProvider } from "@times-components/provider";
import { ratioTextToFloat } from "@times-components/utils";
import { propTypes, defaultProps } from "./topic-prop-types";
import topicTrackingContext from "./topic-tracking-context";

const Topic = ({
  topic,
  error,
  imageRatio,
  isLoading,
  page,
  pageSize,
  onArticlePress,
  onNext,
  onPrev,
  refetch,
  slug
}) => {
  if (error) {
    return <ArticleListPageError refetch={refetch} />;
  }

  if (isLoading) {
    return (
      <ArticleList
        articleListHeader={<TopicHead isLoading />}
        articlesLoading
        imageRatio={ratioTextToFloat(imageRatio)}
        isLoading
        pageSize={10}
        refetch={() => {}}
        showImages
      />
    );
  }

  const { articles, description, name } = topic;

  const articleListHeader = (
    <TopicHead name={name} description={description} isLoading={false} />
  );

  return (
    <ArticleList
      articleListHeader={articleListHeader}
      articles={articles.list}
      count={articles.count}
      error={error}
      imageRatio={ratioTextToFloat(imageRatio)}
      onArticlePress={onArticlePress}
      onNext={onNext}
      onPrev={onPrev}
      page={page}
      pageSize={pageSize}
      refetch={refetch}
      showImages
    />
  );
};

Topic.propTypes = propTypes;
Topic.defaultProps = defaultProps;

export default Topic;
