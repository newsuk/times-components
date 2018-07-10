import React from "react";
import PropTypes from "prop-types";
import { NativeModules } from "react-native";
import { Topic } from "@times-components/pages";

const { onArticlePress } = NativeModules.NativeModuleArticleActions;
const config = NativeModules.NativeModuleReactConfig;
const { fetch } = NativeModules.NativeModuleFetch;
const { track } = NativeModules.NativeModuleAnalytics;

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
