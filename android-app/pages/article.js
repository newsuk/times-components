import React from "react";
import PropTypes from "prop-types";
import { NativeModules } from "react-native";
import { Article } from "@times-components/pages";

const config = NativeModules.ReactConfig;
const { fetch } = NativeModules.NativeFetch;
const { track } = NativeModules.ReactAnalytics;
const {
  onArticlePress,
  onArticleLoaded,
  onAuthorPress,
  onCommentsPress,
  onCommentGuidelinesPress,
  onLinkPress,
  onTopicPress,
  onVideoPress
} = NativeModules.ArticleEvents;
const ArticlePageView = Article(config)(fetch);

const platformAdConfig = {
  adUnit: "thetimes.mob.android",
  networkId: config.adNetworkId,
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

const ArticleView = ({
  adTestMode,
  articleId,
  omitErrors,
  scale,
  sectionName
}) => {
  const adConfig = { ...platformAdConfig, sectionName, testMode: adTestMode };

  return (
    <ArticlePageView
      articleId={articleId}
      analyticsStream={event => {
        if (event.object === "Article" && event.action === "Viewed") {
          onArticleLoaded(event.attrs.articleId, event);
        } else {
          track(event);
        }
      }}
      omitErrors={omitErrors}
      onArticlePress={onArticlePress}
      onAuthorPress={onAuthorPress}
      onCommentsPress={onCommentsPress}
      onCommentGuidelinesPress={onCommentGuidelinesPress}
      onLinkPress={onLinkPress}
      onVideoPress={onVideoPress}
      onTopicPress={onTopicPress}
      platformAdConfig={adConfig}
      scale={scale}
      sectionName={sectionName}
    />
  );
};

ArticleView.propTypes = {
  adTestMode: PropTypes.string,
  articleId: PropTypes.string.isRequired,
  omitErrors: PropTypes.bool.isRequired,
  scale: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired
};

ArticleView.defaultProps = {
  adTestMode: ""
};

export default ArticleView;
