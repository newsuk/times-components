/* eslint-disable consistent-return */

import React, { Component } from "react";
import PropTypes from "prop-types";
import ArticleComments from "@times-components/article-comments";
import RelatedArticles from "@times-components/related-articles";
import { withTrackScrollDepth } from "@times-components/tracking";
import { normaliseWidth, screenWidthInPixels } from "@times-components/utils";
import ArticleRow from "./article-body/article-body-row";
import ArticleTopics from "./article-topics";
import ArticleContent from "./article-content";
import {
  articlePagePropTypes,
  articlePageDefaultProps
} from "./article-prop-types";
import listViewDataHelper from "./data-helper";
import getHeadline from "./utils";

const listViewPageSize = 1;
const listViewSize = 10;
const listViewScrollRenderAheadDistance = 10;

const renderRow = (analyticsStream) => (
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
          onCommentGuidelinesPress={onCommentGuidelinesPress}
          onCommentsPress={onCommentsPress}
          url={rowData.data.url}
        />
      );
    }
  }
};

class Article extends Component {
  static getDerivedStateFromProps(props, state) {
    if (!props.isLoading && !props.error) {
      return {
        ...state,
        dataSource: listViewDataHelper(props.data)
      };
    }
    return state;
  }

  constructor(props) {
    super(props);

    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this);

    if (props.data && !props.isLoading && !props.error) {
      this.state = {
        dataSource: listViewDataHelper(props.data),
        width: normaliseWidth(screenWidthInPixels())
      };
    } else {
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

  render() {
    return (
      <ArticleContent
        data={articleData}
        initialListSize={listViewSize}
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
        pageSize={listViewPageSize}
        renderRow={renderRow(this.props.analyticsStream, this.state.width)}
        scrollRenderAheadDistance={listViewScrollRenderAheadDistance}
      />
    );
  }
}

Article.propTypes = {
  ...articlePagePropTypes,
  onAuthorPress: PropTypes.func.isRequired,
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  onLinkPress: PropTypes.func.isRequired,
  onTwitterLinkPress: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func.isRequired,
};
Article.defaultProps = articlePageDefaultProps;

export default Article;
