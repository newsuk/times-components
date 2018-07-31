import React, { Component } from "react";
import PropTypes from "prop-types";
import { NativeEventEmitter, NativeModules } from "react-native";
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
const articleEventEmitter = new NativeEventEmitter(NativeModules.ArticleEvents);
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

class ArticleView extends Component {
  constructor(props) {
    super(props);
    const { fontSize } = this.props;
    this.state = { fontSize };
  }

  componentDidMount() {
    this.subscription = articleEventEmitter.addListener(
      "fontSizeChange",
      fontSize => this.setState({ fontSize })
    );
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  render() {
    const { articleId, sectionName } = this.props;
    const adConfig = { ...platformAdConfig, sectionName };
    const { fontSize } = this.state;

    return (
      <ArticlePageView
        articleId={articleId}
        analyticsStream={track}
        fontSize={fontSize}
        onArticlePress={onArticlePress}
        onAuthorPress={onAuthorPress}
        onLinkPress={onLinkPress}
        onTopicPress={onTopicPress}
        onVideoPress={onVideoPress}
        platformAdConfig={adConfig}
      />
    );
  }
}

ArticleView.propTypes = {
  articleId: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  sectionName: PropTypes.string.isRequired
};

ArticleView.defaultProps = {
  fontSize: "medium"
};

export default ArticleView;
