/* eslint-disable consistent-return */

import React, { Component, Fragment } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { AdComposer } from "@times-components/ad";
import Article from "@times-components/article";
import { withTrackScrollDepth } from "@times-components/tracking";
import { getHeadline, getLeadAsset, normaliseWidth, screenWidthInPixels } from "@times-components/utils";
import ArticleHeader from "./article-header/article-header";
import ArticleLeadAsset from "./article-lead-asset/article-lead-asset";
import ArticleMeta from "./article-meta/article-meta";
import ArticleContent from "./article-content";
import ArticleError from "@times-components/article-error";
import stylesFactory from "./styles/article-body";
import {
  articlePagePropTypes,
  articlePageDefaultProps
} from "./article-page-prop-types";
import articleTrackingContext from "./article-tracking-context";
import listViewDataHelper from "./data-helper";

class ArticlePage extends Component {
  constructor(props) {
    super(props);

    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this);
    this.renderHeader = this.renderHeader.bind(this);

    if (props.article && !props.isLoading && !props.error) {
      this.state = {
        dataSource: props.article,
        width: normaliseWidth(screenWidthInPixels())
      };
    }
    else {
      this.state = {
        dataSource: {}
      };
    }
  }

  onViewableItemsChanged(info) {
    if (!info.changed.length) return [];

    return info.changed
      .filter(viewableItem => viewableItem.isViewable)
      .map(viewableItem =>
        this.props.onViewed(viewableItem.item, this.state.dataSource)
      );
  }

  renderHeader(){
    const { byline, flags, hasVideo, headline, label,publicationName, publishedTime, shortHeadline, standfirst } = this.props.article;
    const { article, onAuthorPress, onVideoPress } = this.props;
    const { isVideo, leadAsset } = getLeadAsset(article);
    const styles = stylesFactory();

    return (
      <Fragment>
      <View key="leadAsset" testID="leadAsset">
        <ArticleLeadAsset
          data={{ ...leadAsset, onVideoPress }}
          width={this.state.width}
        />
      </View>
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
    )
  }

  render() {
    const { error, refetch, isLoading, receiveChildList } = this.props;

    if (error) {
      return <ArticleError refetch={refetch} />;
    }

    if (isLoading) {
      return null;
    }

    return(
      <AdComposer adConfig={this.props.adConfig}>
        <Fragment>
        <Article
          data={this.props.article}
          header={this.renderHeader}
          onAuthorPress={this.props.onAuthorPress}
          onCommentGuidelinesPress={this.props.onCommentGuidelinesPress}
          onCommentsPress={this.props.onCommentsPress}
          onLinkPress={this.props.onLinkPress}
          onRelatedArticlePress={this.props.onRelatedArticlePress}
          onTopicPress={this.props.onTopicPress}
          onTwitterLinkPress={this.props.onTwitterLinkPress}
          onVideoPress={this.props.onVideoPress}
          onViewableItemsChanged={
            this.props.onViewed ? this.onViewableItemsChanged : null
          }
        />
        </Fragment>
      </AdComposer>
    )
  }
}

ArticlePage.propTypes = {
  ...articlePagePropTypes,
  onAuthorPress: PropTypes.func.isRequired,
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  onLinkPress: PropTypes.func.isRequired,
  onTwitterLinkPress: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};
ArticlePage.defaultProps = articlePageDefaultProps;

export default articleTrackingContext(withTrackScrollDepth(ArticlePage));
