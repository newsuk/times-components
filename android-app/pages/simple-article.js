import React from "react";
import { NativeModules } from "react-native";
import PropTypes from "prop-types";
import { NativeArticleProvider } from "@times-components/provider";
import { SimpleArticle } from "@times-components/pages";

const config = NativeModules.ReactConfig;
const { fetch } = NativeModules.NativeArticleProvider;
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

const SimpleArticleView = ({ articleId, omitErrors, scale, sectionName }) => {
  const adConfig = { ...platformAdConfig, sectionName };

  return (
    <NativeArticleProvider articleId={articleId} fetch={fetch}>
      {({ data: article, isLoading, error, refetch }) => (
        <SimpleArticle
          article={article}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
          analyticsStream={track}
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
      )}
    </NativeArticleProvider>
  );
};

SimpleArticleView.propTypes = {
  articleId: PropTypes.string.isRequired,
  omitErrors: PropTypes.bool.isRequired,
  scale: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired
};

export default SimpleArticleView;
