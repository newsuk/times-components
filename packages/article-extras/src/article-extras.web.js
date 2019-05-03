import React, { Fragment } from "react";
import PropTypes from "prop-types";
import ArticleComments from "@times-components/article-comments";
import RelatedArticles from "@times-components/related-articles";
import ArticleTopics from "./article-topics";

const ArticleExtras = ({
  analyticsStream,
  articleId,
  commentsAllowed,
  commentsEnabled,
  registerNode,
  relatedArticleAllowed,
  relatedArticleSlice,
  relatedArticlesVisible,
  spotAccountId,
  topics,
  topicsAllowed
}) => (
  <Fragment>
    {topicsAllowed ? <ArticleTopics topics={topics} /> : null}
    <aside id="related-articles" ref={node => registerNode(node)}>
      {relatedArticleAllowed ? (
        <RelatedArticles
          analyticsStream={analyticsStream}
          isVisible={relatedArticlesVisible}
          slice={relatedArticleSlice}
        />
      ) : null}
    </aside>
    {commentsAllowed ? (
      <ArticleComments
        articleId={articleId}
        isEnabled={commentsEnabled}
        spotAccountId={spotAccountId}
      />
    ) : null}
  </Fragment>
);

ArticleExtras.propTypes = {
  analyticsStream: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired,
  commentsAllowed: PropTypes.bool.isRequired,
  commentsEnabled: PropTypes.bool.isRequired,
  registerNode: PropTypes.func.isRequired,
  relatedArticleAllowed: PropTypes.bool.isRequired,
  relatedArticleSlice: PropTypes.shape({}),
  relatedArticlesVisible: PropTypes.bool.isRequired,
  spotAccountId: PropTypes.string,
  topics: PropTypes.arrayOf(PropTypes.shape({})),
  topicsAllowed: PropTypes.bool.isRequired
};

ArticleExtras.defaultProps = {
  relatedArticleSlice: null,
  spotAccountId: null,
  topics: null
};

export default ArticleExtras;
