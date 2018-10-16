/* eslint-disable consistent-return */

import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { AdComposer } from "@times-components/ad";
import Article from "@times-components/article";
import { withTrackScrollDepth } from "@times-components/tracking";
import ArticleHeader from "./article-header/article-header";
import ArticleLeadAsset from "./article-lead-asset/article-lead-asset";
import ArticleMeta from "./article-meta/article-meta";
import ArticleContent from "./article-content";
import ArticleError from "./article-error";
import ArticleLoading from "./article-loading";
import stylesFactory from "./styles/article-body";
import { articlePropTypes, articleDefaultProps } from "./article-prop-types";
import articleTrackingContext from "./article-tracking-context";
import listViewDataHelper from "./data-helper";

const listViewPageSize = 1;
const listViewSize = 10;
const listViewScrollRenderAheadDistance = 10;

const renderRow = (
  rowData,
  onAuthorPress,
  onCommentsPress,
  onCommentGuidelinesPress,
  onLinkPress,
  onRelatedArticlePress,
  onTopicPress,
  onTwitterLinkPress,
  onVideoPress
) => {
  // eslint-disable-next-line default-case
  switch (rowData.type) {
    case "leadAsset": {
      return (
        <View key="leadAsset" testID="leadAsset">
          <ArticleLeadAsset
            data={{ ...rowData.data, onVideoPress }}
            key={rowData.type}
          />
        </View>
      );
    }

    case "header": {
      const { flags, hasVideo, headline, label, standfirst } = rowData.data;
      const styles = stylesFactory();
      return (
        <ArticleHeader
          flags={flags}
          hasVideo={hasVideo}
          headline={headline}
          key={rowData.type}
          label={label}
          standfirst={standfirst}
          style={[styles.articleMainContentRow]}
        />
      );
    }

    case "middleContainer": {
      const { byline, publishedTime, publicationName } = rowData.data;
      return (
        <ArticleMeta
          byline={byline}
          key={rowData.type}
          onAuthorPress={onAuthorPress}
          publicationName={publicationName}
          publishedTime={publishedTime}
        />
      );
    }

    case "content": {
      return (
        <Article
          article={rowData.data}
          onAuthorPress={onAuthorPress}
          onCommentGuidelinesPress={onCommentGuidelinesPress}
          onCommentsPress={onCommentsPress}
          onLinkPress={onLinkPress}
          onRelatedArticlePress={onRelatedArticlePress}
          onTopicPress={onTopicPress}
          onTwitterLinkPress={onTwitterLinkPress}
          onVideoPress={onVideoPress}
        />
      );
    }
  }
};

class ArticlePage extends Component {
  static getDerivedStateFromProps(props, state) {
    if (!props.isLoading && !props.error) {
      return {
        ...state,
        dataSource: listViewDataHelper(props.article)
      };
    }
    return state;
  }

  constructor(props) {
    super(props);

    if (props.article && !props.isLoading && !props.error) {
      this.state = {
        dataSource: listViewDataHelper(props.article)
      };
    } else {
      this.state = {
        dataSource: {}
      };
    }
  }

  render() {
    const { error, refetch, isLoading } = this.props;

    if (error) {
      return <ArticleError refetch={refetch} />;
    }

    if (isLoading) {
      return <ArticleLoading />;
    }
    const ArticleListView = (
      <ArticleContent
        data={this.state.dataSource}
        initialListSize={listViewSize}
        onAuthorPress={this.props.onAuthorPress}
        onCommentGuidelinesPress={this.props.onCommentGuidelinesPress}
        onCommentsPress={this.props.onCommentsPress}
        onLinkPress={this.props.onLinkPress}
        onRelatedArticlePress={this.props.onRelatedArticlePress}
        onTopicPress={this.props.onTopicPress}
        onTwitterLinkPress={this.props.onTwitterLinkPress}
        onVideoPress={this.props.onVideoPress}
        pageSize={listViewPageSize}
        renderRow={renderRow}
        scrollRenderAheadDistance={listViewScrollRenderAheadDistance}
      />
    );

    return (
      <AdComposer adConfig={this.props.adConfig}>{ArticleListView}</AdComposer>
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
  refetch: PropTypes.func.isRequired
};
ArticlePage.defaultProps = articleDefaultProps;

export default articleTrackingContext(withTrackScrollDepth(ArticlePage));
