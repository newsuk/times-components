import React from "react";
import PropTypes from "prop-types";
import { NativeModules } from "react-native";
import { Article } from "@times-components/pages";
import Context, { defaults } from "@times-components/context";
import { colours } from "@times-components/styleguide";

const config = NativeModules.ReactConfig;
const { fetch } = NativeModules.NativeFetch;
const { track } = NativeModules.ReactAnalytics;
const {
  onArticlePress,
  onAuthorPress,
  onCommentsPress,
  onCommentGuidelinesPress,
  onLinkPress,
  onTopicPress,
  onVideoPress
} = NativeModules.ArticleEvents;
const ArticlePageView = Article(config)(fetch);

const platformAdConfig = {
  adUnit: "d.thetimes.co.uk",
  networkId: "25436805",
  testMode: "",
  appVersion: config.appVersion,
  operatingSystem: "Android",
  operatingSystemVersion: config.operatingSystemVersion,
  environment: config.environment,
  deviceId: config.deviceId,
  cookieEid: config.cookieEid,
  cookieAcsTnl: config.cookieAcsTnl,
  cookieIamTgt: config.cookieIamTgt,
  isLoggedIn: config.isLoggedIn,
  platform: "mobile"
};

const ArticleView = ({ articleId, scale, sectionName }) => {
  const adConfig = { ...platformAdConfig, sectionName };
  const theme = {
    scale: scale || defaults.theme.scale,
    sectionColour: colours.section[sectionName]
  };

  return (
    <Context.Provider value={{ theme }}>
      <ArticlePageView
        articleId={articleId}
        analyticsStream={track}
        onArticlePress={onArticlePress}
        onAuthorPress={onAuthorPress}
        onCommentsPress={onCommentsPress}
        onCommentGuidelinesPress={onCommentGuidelinesPress}
        onLinkPress={onLinkPress}
        onVideoPress={onVideoPress}
        onTopicPress={onTopicPress}
        platformAdConfig={adConfig}
      />
    </Context.Provider>
  );
};

ArticleView.propTypes = {
  articleId: PropTypes.string.isRequired,
  scale: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired
};

export default ArticleView;
