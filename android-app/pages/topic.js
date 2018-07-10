import React from "react";
import PropTypes from "prop-types";
import { NativeModules } from "react-native";
import { Topic } from "@times-components/pages";

const { onArticlePress } = NativeModules.TopicEvents;
const config = NativeModules.ReactConfig;
const { fetch } = NativeModules.NativeFetch;
const { track } = NativeModules.ReactAnalytics;

const TopicPageView = Topic(config)(fetch);

const TopicView = ({ topicSlug }) => (
  <TopicPageView
    topicSlug={topicSlug}
    onArticlePress={onArticlePress}
    analyticsStream={track}
  />
);

TopicView.propTypes = {
  topicSlug: PropTypes.string.isRequired
};

export default TopicView;
