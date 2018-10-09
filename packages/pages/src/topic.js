import React from "react";
import PropTypes from "prop-types";
import Topic from "@times-components/topic";
import { TopicProvider } from "@times-components/provider";
import withClient from "./client/with-client";

const TopicPage = ({ topicSlug, onArticlePress, analyticsStream }) => (
  <TopicProvider debounceTimeMs={250} page={1} pageSize={20} slug={topicSlug}>
    {({ topic, isLoading, error, page, pageSize, refetch }) => (
      <Topic
        analyticsStream={analyticsStream}
        error={error}
        isLoading={isLoading}
        onArticlePress={(event, extras) => onArticlePress(extras.url)}
        page={page}
        pageSize={pageSize}
        refetch={refetch}
        slug={topicSlug}
        topic={topic}
      />
    )}
  </TopicProvider>
);

TopicPage.propTypes = {
  analyticsStream: PropTypes.func.isRequired,
  onArticlePress: PropTypes.func.isRequired,
  topicSlug: PropTypes.string.isRequired
};

export default withClient(TopicPage);
