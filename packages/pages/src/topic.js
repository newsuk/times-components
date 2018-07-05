import React from "react";
import PropTypes from "prop-types";
import Topic from "@times-components/topic";
import { TopicProvider } from "@times-components/provider";
import withClient from "./client/with-client";

const TopicPage = ({ topicSlug, onArticlePress, analyticsStream }) => (
  <TopicProvider slug={topicSlug} page={1} pageSize={20} debounceTimeMs={250}>
    {({ topic, isLoading, error, page, pageSize, refetch }) => (
      <Topic
        topic={topic}
        slug={topicSlug}
        isLoading={isLoading}
        error={error}
        onArticlePress={(event, extras) => onArticlePress(extras.url)}
        analyticsStream={analyticsStream}
        page={page}
        refetch={refetch}
        pageSize={pageSize}
      />
    )}
  </TopicProvider>
);

TopicPage.propTypes = {
  topicSlug: PropTypes.string.isRequired,
  analyticsStream: PropTypes.func.isRequired,
  onArticlePress: PropTypes.func.isRequired
};

export default withClient(TopicPage);
