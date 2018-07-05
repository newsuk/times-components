import React from "react";
import PropTypes from "prop-types";
import { NativeModules } from "react-native";
import { Article } from "@times-components/pages";

const {
  onRelatedArticlePress,
  onLinkPress,
  onAuthorPress,
  onVideoPress,
  onTopicPress
} = NativeModules.NativeModuleArticleActions;
const config = NativeModules.NativeModuleReactConfig;
const { fetch } = NativeModules.NativeModuleFetch;
const { track } = NativeModules.NativeModuleAnalytics;

const platformAdConfig = {
  adUnit: "d.thetimes.co.uk",
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
    onArticlePress={url => onRelatedArticlePress(url)}
    onLinkPress={url => onLinkPress(url)}
    onAuthorPress={slug => onAuthorPress(slug)}
    onVideoPress={extras => onVideoPress(extras)}
    onTopicPress={url => onTopicPress(url)}
    platformAdConfig={platformAdConfig({
      sectionId: "9e51e2a0-fadf-11e7-9a34-94e1b34681c3",
      sectionName: "News",
      articlePositionInSlot: 3
    })}
  />
);

ArticleView.propTypes = {
  articleId: PropTypes.string.isRequired
}

export default ArticleView;
