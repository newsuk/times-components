/* eslint-disable consistent-return */

import React, { Component, Fragment } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import ArticleError from "@times-components/article-error";
import ArticleSkeleton from "@times-components/article-skeleton";
import ArticleLeadAsset from "@times-components/article-lead-asset";
import Responsive, { ResponsiveContext } from "@times-components/responsive";
import {
  getHeadline,
  getLeadAsset,
  getStandardTemplateCrop
} from "@times-components/utils";
import Caption from "@times-components/caption";
import ArticleHeader from "./article-header/article-header";
import ArticleMeta from "./article-meta/article-meta";
import stylesFactory from "./styles/article-body";
import {
  articlePropTypes,
  articleDefaultProps
} from "./article-prop-types/article-prop-types";

class ArticlePage extends Component {
  constructor() {
    super();
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader(parentProps) {
    const { article, onAuthorPress, onVideoPress } = this.props;
    const {
      byline,
      flags,
      hasVideo,
      headline,
      label,
      publicationName,
      publishedTime,
      shortHeadline,
      standfirst
    } = article;
    const styles = stylesFactory();

    return (
      <Responsive>
        <ResponsiveContext.Consumer>
          {({ isTablet }) => {
            const leadAsset = (
              <View key="leadAsset" testID="leadAsset">
                <ArticleLeadAsset
                  {...getLeadAsset(article)}
                  getImageCrop={getStandardTemplateCrop}
                  onVideoPress={onVideoPress}
                  renderModalCaption={({ caption }) => <Caption {...caption} />}
                  style={[styles.leadAsset, isTablet && styles.leadAssetTablet]}
                  width={parentProps.width}
                />
              </View>
            );
            const header = (
              <Fragment key="header">
                <ArticleHeader
                  flags={flags}
                  hasVideo={hasVideo}
                  headline={getHeadline(headline, shortHeadline)}
                  label={label}
                  standfirst={standfirst}
                  style={[styles.articleMainContentRow]}
                />
                <ArticleMeta
                  byline={byline}
                  onAuthorPress={onAuthorPress}
                  publicationName={publicationName}
                  publishedTime={publishedTime}
                />
              </Fragment>
            );
            return isTablet ? [header, leadAsset] : [leadAsset, header];
          }}
        </ResponsiveContext.Consumer>
      </Responsive>
    );
  }

  render() {
    const { error, refetch, isLoading } = this.props;

    if (error) {
      return <ArticleError refetch={refetch} />;
    }

    if (isLoading) {
      return null;
    }

    const {
      adConfig,
      analyticsStream,
      article,
      onAuthorPress,
      onCommentGuidelinesPress,
      onCommentsPress,
      onLinkPress,
      onRelatedArticlePress,
      onTopicPress,
      onTwitterLinkPress,
      onVideoPress,
      onViewed,
      receiveChildList,
      referralUrl
    } = this.props;

    return (
      <ArticleSkeleton
        adConfig={adConfig}
        analyticsStream={analyticsStream}
        data={article}
        Header={this.renderHeader}
        onAuthorPress={onAuthorPress}
        onCommentGuidelinesPress={onCommentGuidelinesPress}
        onCommentsPress={onCommentsPress}
        onLinkPress={onLinkPress}
        onRelatedArticlePress={onRelatedArticlePress}
        onTopicPress={onTopicPress}
        onTwitterLinkPress={onTwitterLinkPress}
        onVideoPress={onVideoPress}
        onViewableItemsChanged={onViewed ? this.onViewableItemsChanged : null}
        receiveChildList={receiveChildList}
        referralUrl={referralUrl}
      />
    );
  }
}

ArticlePage.propTypes = {
  ...articlePropTypes,
  onAuthorPress: PropTypes.func.isRequired,
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  onLinkPress: PropTypes.func.isRequired,
  onTwitterLinkPress: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func.isRequired,
  referralUrl: PropTypes.string,
  refetch: PropTypes.func.isRequired
};
ArticlePage.defaultProps = {
  ...articleDefaultProps,
  referralUrl: null
};

export default ArticlePage;
