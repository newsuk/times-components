import React from "react";
import { NativeModules } from "react-native";
import PropTypes from "prop-types";
import Topic from "@times-components/topic";
import { TopicProvider } from "@times-components/provider";
import { ApolloProvider } from "react-apollo";
import client from "../apollo-client";

const { onArticlePress } = NativeModules.TopicEvents;
const { track } = NativeModules.ReactAnalytics;

const TopicPage = ({ topicSlug }) => (
  <ApolloProvider client={client}>
    <TopicProvider debounceTimeMs={250} page={1} pageSize={20} slug={topicSlug}>
      {({ topic, isLoading, error, page, pageSize, refetch }) => (
        <Topic
          analyticsStream={track}
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
  </ApolloProvider>
);

TopicPage.propTypes = {
  topicSlug: PropTypes.string.isRequired
};

export default TopicPage;
