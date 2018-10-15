/* eslint-disable consistent-return */

import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { AdComposer } from "@times-components/ad";
import RelatedArticles from "@times-components/related-articles";
import { normaliseWidth, screenWidthInPixels } from "@times-components/utils";
import ArticleRow from "./article-body/article-body-row";
import ArticleHeader from "./article-header/article-header";
import ArticleLeadAsset from "./article-lead-asset/article-lead-asset";
import ArticleMeta from "./article-meta/article-meta";
import ArticleTopics from "./article-topics";
import ArticleContent from "./article-content";
import ArticleError from "./article-error";
import ArticleLoading from "./article-loading";
import ArticleComments from "./article-comments/article-comments";
import stylesFactory from "./styles/article-body";
import {
  articlePagePropTypes,
  articlePageDefaultProps
} from "./article-page-prop-types";
import articleTrackingContext from "./article-tracking-context";
import listViewDataHelper from "./data-helper";

const listViewPageSize = 1;
const listViewSize = 10;
const listViewScrollRenderAheadDistance = 10;

const renderRow = (analyticsStream, width) => (
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
            width={width}
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

    case "articleBodyRow": {
      return (
        <ArticleRow
          content={rowData}
          onLinkPress={onLinkPress}
          onTwitterLinkPress={onTwitterLinkPress}
          onVideoPress={onVideoPress}
        />
      );
    }

    case "relatedArticleSlice": {
      const { relatedArticleSlice } = rowData.data;
      return (
        <RelatedArticles
          analyticsStream={analyticsStream}
          onPress={onRelatedArticlePress}
          slice={relatedArticleSlice}
        />
      );
    }

    case "topics": {
      return (
        <ArticleTopics onPress={onTopicPress} topics={rowData.data.topics} />
      );
    }

    case "comments": {
      return (
        <ArticleComments
          articleId={rowData.data.articleId}
          commentCount={rowData.data.commentCount}
          commentsEnabled={rowData.data.commentsEnabled}
          onCommentGuidelinesPress={onCommentGuidelinesPress}
          onCommentsPress={onCommentsPress}
          url={rowData.data.url}
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
        dataSource: listViewDataHelper(props.article),
        width: normaliseWidth(screenWidthInPixels())
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
        renderRow={renderRow(this.props.analyticsStream, this.state.width)}
        scrollRenderAheadDistance={listViewScrollRenderAheadDistance}
      />
    );

    return (
      <AdComposer adConfig={this.props.adConfig}>{ArticleListView}</AdComposer>
    );
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

export default articleTrackingContext(ArticlePage);
