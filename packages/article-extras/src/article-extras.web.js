import React from "react";
import PropTypes from "prop-types";
import UserState from "@times-components/user-state";
import ArticleComments from "@times-components/article-comments";
import RelatedArticles from "@times-components/related-articles";
import ArticleTopics from "./article-topics";

const ArticleExtras = ({
  analyticsStream,
  articleId,
  commentsEnabled,
  registerNode,
  relatedArticleSlice,
  relatedArticlesVisible,
  spotAccountId,
  topics
}) => (
  <UserState state={UserState.fullArticle}>
    <ArticleTopics topics={topics} />
    <aside id="related-articles" ref={node => registerNode(node)}>
      <RelatedArticles
        analyticsStream={analyticsStream}
        isVisible={relatedArticlesVisible}
        slice={relatedArticleSlice}
      />
    </aside>
    <ArticleComments
      articleId={articleId}
      isEnabled={commentsEnabled}
      spotAccountId={spotAccountId}
    />
  </UserState>
);

ArticleExtras.propTypes = {
  analyticsStream: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired,
  commentsEnabled: PropTypes.bool.isRequired,
  registerNode: PropTypes.func.isRequired,
  relatedArticleSlice: PropTypes.shape({}),
  relatedArticlesVisible: PropTypes.bool.isRequired,
  spotAccountId: PropTypes.string,
  topics: PropTypes.arrayOf(PropTypes.shape({}))
};

ArticleExtras.defaultProps = {
  relatedArticleSlice: null,
  spotAccountId: null,
  topics: null
};

export default ArticleExtras;
