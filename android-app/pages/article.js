import React from "react";
import PropTypes from "prop-types";
import { NativeModules } from "react-native";
import { Article } from "@times-components/pages";

const config = NativeModules.ReactConfig;
const { fetch } = NativeModules.NativeFetch;
const { track } = NativeModules.ReactAnalytics;
const {
  onArticlePress,
  onAuthorPress,
  onLinkPress,
  onVideoPress,
  onTopicPress
} = NativeModules.ArticleEvents;
const ArticlePageView = Article(config)(fetch);

const getPlatformAdConfig = adConfig => ({
  adUnit: "d.thetimes.co.uk",
  networkId: "25436805",
  testMode: "",
  sectionName: adConfig.sectionName,
  appVersion: adConfig.appVersion,
  operatingSystem: "Android",
  operatingSystemVersion: adConfig.operatingSystemVersion,
  environment: adConfig.environment,
  deviceId: adConfig.deviceId,
  cookieEid: adConfig.cookieEid,
  cookieAcsTnl: adConfig.cookieAcsTnl,
  cookieIamTgt: adConfig.cookieIamTgt,
  isLoggedIn: adConfig.isLoggedIn,
  platform: "mobile"
});

const ArticleView = ({
  articleId,
  sectionName
}) => {
  const adConfig = {
    sectionName
  };

  return (
    <ArticlePageView
      articleId={articleId}
      analyticsStream={track}
      onArticlePress={onArticlePress}
      onAuthorPress={onAuthorPress}
      onLinkPress={onLinkPress}
      onVideoPress={onVideoPress}
      onTopicPress={onTopicPress}
      platformAdConfig={getPlatformAdConfig(adConfig)}
    />
  );
};

ArticleView.propTypes = {
  articleId: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired
};

export default ArticleView;
