/* eslint-disable consistent-return */

import React, { Component } from "react";
import PropTypes from "prop-types";
import ArticleComments from "@times-components/article-comments";
import { AdComposer } from "@times-components/ad";
import RelatedArticles from "@times-components/related-articles";
import Responsive from "@times-components/responsive";
import { withTrackScrollDepth } from "@times-components/tracking";
import { normaliseWidth, screenWidthInPixels } from "@times-components/utils";
import ArticleRow from "./article-body/article-body-row";
import ArticleTopics from "./article-topics";
import ArticleContent from "./article-content";
import {
  articleSkeletonPropTypes,
  articleSkeletonDefaultProps
} from "./article-skeleton-prop-types";
import listViewDataHelper from "./data-helper";
import articleTrackingContext from "./article-tracking-context";
import insertDropcapIntoAST from "./dropcap-util";

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
  onTwitterLinkPress,
  onVideoPress,
  interactiveConfig
) => {
  // eslint-disable-next-line default-case
  switch (rowData.type) {
    case "articleBodyRow": {
      return (
        <ArticleRow
          content={rowData}
          interactiveConfig={interactiveConfig}
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

class ArticleSkeleton extends Component {
  constructor(props) {
    super(props);
    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this);

    if (props.data) {
      this.state = {
        dataSource: props.data,
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

    const { onViewed } = this.props;
    const { dataSource } = this.state;

    return info.changed
      .filter(viewableItem => viewableItem.isViewable)
      .map(viewableItem => onViewed(viewableItem.item, dataSource));
  }

  render() {
    const {
      adConfig,
      analyticsStream,
      Header,
      interactiveConfig,
      onAuthorPress,
      onCommentGuidelinesPress,
      onCommentsPress,
      onLinkPress,
      onRelatedArticlePress,
      onTopicPress,
      onTwitterLinkPress,
      onViewed,
      onVideoPress,
      receiveChildList
    } = this.props;
    const { dataSource, width } = this.state;
    const { dropcapsDisabled, template } = dataSource;
    if (!dataSource.content) {
      return null;
    }

    const newContent = [...dataSource.content];
    if (newContent && newContent.length > 0) {
      newContent[0] = insertDropcapIntoAST(
        newContent[0],
        template,
        dropcapsDisabled
      );
    }

    const articleOrganised = listViewDataHelper({
      ...dataSource,
      content: newContent
    });
    const articleData = articleOrganised.map((item, index) => ({
      ...item,
      elementId: `${item.type}.${index}`,
      name: item.type
    }));

    receiveChildList(articleData);

    return (
      <AdComposer adConfig={adConfig}>
        <Responsive>
          <ArticleContent
            data={articleData}
            Header={Header}
            initialListSize={listViewSize}
            interactiveConfig={interactiveConfig}
            onAuthorPress={onAuthorPress}
            onCommentGuidelinesPress={onCommentGuidelinesPress}
            onCommentsPress={onCommentsPress}
            onLinkPress={onLinkPress}
            onRelatedArticlePress={onRelatedArticlePress}
            onTopicPress={onTopicPress}
            onTwitterLinkPress={onTwitterLinkPress}
            onVideoPress={onVideoPress}
            onViewableItemsChanged={
              onViewed ? this.onViewableItemsChanged : null
            }
            pageSize={listViewPageSize}
            renderRow={renderRow(analyticsStream)}
            scrollRenderAheadDistance={listViewScrollRenderAheadDistance}
            width={width}
          />
        </Responsive>
      </AdComposer>
    );
  }
}

ArticleSkeleton.propTypes = {
  ...articleSkeletonPropTypes,
  interactiveConfig: PropTypes.shape({}),
  onAuthorPress: PropTypes.func.isRequired,
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  onLinkPress: PropTypes.func.isRequired,
  onRelatedArticlePress: PropTypes.func.isRequired,
  onTwitterLinkPress: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func.isRequired
};
ArticleSkeleton.defaultProps = {
  ...articleSkeletonDefaultProps,
  interactiveConfig: {}
};

export default articleTrackingContext(withTrackScrollDepth(ArticleSkeleton));
