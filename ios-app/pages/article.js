import React from "react";
import PropTypes from "prop-types";
import { NativeModules } from "react-native";
import { Article } from "@times-components/pages";

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

const ArticlePageView = Article(config)(fetch);

const ArticleView = ({ articleId }) => (
  <ArticlePageView
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

ArticleView.propTypes = {
  articleId: PropTypes.string.isRequired
};

export default ArticleView;
