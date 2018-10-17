import React from "react";
import PropTypes from "prop-types";
import { NativeModules } from "react-native";
import { SimpleArticle } from "@times-components/pages";

const {
  onRelatedArticlePress: onArticlePress,
  onLinkPress,
  onAuthorPress,
  onVideoPress,
  onTopicPress
} = NativeModules.NativeModuleArticleActions;
const config = NativeModules.NativeModuleReactConfig;
const { fetch } = NativeModules.NativeModuleFetch;
const { track } = NativeModules.NativeModuleAnalytics;

const platformAdConfig = {
  adUnit: "thetimes.mob.ios",
  networkId: "25436805",
  testMode: "",
  sectionId: "",
  sectionName: "",
  articlePositionInSlot: 0,
  appVersion: "",
  operatingSystem: "",
  operatingSystemVersion: "",
  cookieEid: "",
  cookieAcsTnl: "",
  cookieIamTgt: "",
  deviceId: "",
  deviceIdHash: "",
  environment: "",
  isLoggedIn: true,
  platform: "mobile"
};

const SimpleArticlePageView = SimpleArticle(config)(fetch);

const SimpleArticleView = ({ article, articleId }) => (
  <SimpleArticlePageView
    article={article}
    articleId={articleId}
    analyticsStream={track}
    onArticlePress={onArticlePress}
    onAuthorPress={onAuthorPress}
    onLinkPress={onLinkPress}
    onVideoPress={onVideoPress}
    onTopicPress={onTopicPress}
    platformAdConfig={platformAdConfig}
  />
);

SimpleArticleView.propTypes = {
  articleId: PropTypes.string.isRequired
};

export default SimpleArticleView;
