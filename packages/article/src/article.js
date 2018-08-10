/* eslint-disable consistent-return */

import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { AdComposer } from "@times-components/ad";
import RelatedArticles from "@times-components/related-articles";
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
import { articlePropTypes, articleDefaultProps } from "./article-prop-types";
import articleTrackingContext from "./article-tracking-context";
import listViewDataHelper from "./data-helper";

const listViewPageSize = 1;
const listViewSize = 10;
const listViewScrollRenderAheadDistance = 10;

const renderRow = analyticsStream => (
  rowData,
  onAuthorPress,
  onCommentsPress,
  onCommentGuidelinesPress,
  onLinkPress,
  onRelatedArticlePress,
  onTopicPress,
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
      const { headline, flags, standfirst, label, isVideo } = rowData.data;
      const styles = stylesFactory();
      return (
        <ArticleHeader
          flags={flags}
          headline={headline}
          isVideo={isVideo}
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
          onVideoPress={onVideoPress}
        />
      );
    }

    case "relatedArticles": {
      const { relatedArticles, relatedArticlesLayout } = rowData.data;
      return (
        <RelatedArticles
          analyticsStream={analyticsStream}
          articles={relatedArticles}
          mainId={relatedArticlesLayout.main}
          onPress={onRelatedArticlePress}
          template={relatedArticlesLayout.template}
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

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading && !nextProps.error) {
      this.setState({
        dataSource: listViewDataHelper(nextProps.article)
      });
    }
  }

  render() {
    const { error, isLoading } = this.props;

    if (error) {
      return <ArticleError {...error} />;
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
        onVideoPress={this.props.onVideoPress}
        pageSize={listViewPageSize}
        renderRow={renderRow(this.props.analyticsStream)}
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
  onCommentsPress: PropTypes.func.isRequired,
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  onLinkPress: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func.isRequired
};
ArticlePage.defaultProps = articleDefaultProps;

export default articleTrackingContext(ArticlePage);
