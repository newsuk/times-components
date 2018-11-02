/* eslint-disable consistent-return */

import React from "react";
import PropTypes from "prop-types";
import ArticleComments from "@times-components/article-comments";
import AdComposer from "@times-components/ad";
import RelatedArticles from "@times-components/related-articles";
import ArticleRow from "./article-body/article-body-row";
import ArticleTopics from "./article-topics";
import ArticleContent from "./article-content";
import {
  articlePropTypes,
  articleDefaultProps
} from "./article-prop-types";
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

const Article = props => {
  const {
    adConfig,
    analyticsStream,
    data,
    header,
    onAuthorPress,
    onCommentGuidelinesPress,
    onCommentsPress,
    onLinkPress,
    onRelatedArticlePress,
    onTopicPress,
    onTwitterLinkPress,
    onViewableItemsChanged,
    onVideoPress,
    receiveChildList
  } = props;

  const articleOrganised = listViewDataHelper(data);
  const articleData = articleOrganised.map((item, index) => ({
    ...item,
    elementId: `${item.type}.${index}`,
    name: item.type
  }));

  receiveChildList(articleData);

  return (
    <AdComposer adConfig={adConfig}>
      <ArticleContent
        data={articleData}
        header={header}
        initialListSize={listViewSize}
        onAuthorPress={onAuthorPress}
        onCommentGuidelinesPress={onCommentGuidelinesPress}
        onCommentsPress={onCommentsPress}
        onLinkPress={onLinkPress}
        onRelatedArticlePress={onRelatedArticlePress}
        onTopicPress={onTopicPress}
        onTwitterLinkPress={onTwitterLinkPress}
        onVideoPress={onVideoPress}
        onViewableItemsChanged={onViewableItemsChanged}
        pageSize={listViewPageSize}
        renderRow={renderRow(analyticsStream)}
        scrollRenderAheadDistance={listViewScrollRenderAheadDistance}
      />
    </AdComposer>
  );
};

Article.propTypes = {
  ...articlePropTypes,
  onAuthorPress: PropTypes.func.isRequired,
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  onLinkPress: PropTypes.func.isRequired,
  onRelatedArticlePress: PropTypes.func.isRequired,
  onTwitterLinkPress: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func.isRequired
};
Article.defaultProps = articleDefaultProps;

export default Article;
