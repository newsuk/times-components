import React from "react";
import PropTypes from "prop-types";
import { NativeModules } from "react-native";
import { Article } from "@times-components/pages";
import DeviceInfo from "react-native-device-info";

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

const getPlatformAdConfig = config => ({
  adUnit: "d.thetimes.co.uk",
  networkId: "25436805",
  testMode: "",
  sectionName: config.sectionName,
  appVersion: config.appVersion,
  operatingSystem: "Android",
  operatingSystemVersion: config.operatingSystemVersion,
  environment: config.environment,
  deviceId: DeviceInfo.getUniqueID(),
  cookieEid: config.cookieEid,
  cookieAcsTnl: config.cookieAcsTnl,
  cookieIamTgt: config.cookieIamTgt,
  isLoggedIn: config.isLoggedIn,
  platform: "mobile"
});

const ArticleView = ({
  articleId,
  sectionName,
  appVersion,
  operatingSystemVersion,
  environment,
  cookieEid,
  cookieAcsTnl,
  cookieIamTgt,
  isLoggedIn
}) => {
  const adConfig = {
    sectionName,
    appVersion,
    operatingSystemVersion,
    environment,
    cookieEid,
    cookieAcsTnl,
    cookieIamTgt,
    isLoggedIn
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
  sectionName: PropTypes.string.isRequired,
  appVersion: PropTypes.string.isRequired,
  operatingSystemVersion: PropTypes.string.isRequired,
  environment: PropTypes.string.isRequired,
  cookieEid: PropTypes.string.isRequired,
  cookieAcsTnl: PropTypes.string.isRequired,
  cookieIamTgt: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.string.isRequired
};

export default ArticleView;
