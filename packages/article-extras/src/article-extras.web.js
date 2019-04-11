import React, { Fragment } from "react";
import PropTypes from "prop-types";
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
  <Fragment>
    <ArticleTopics topics={topics} />
    <aside id="related-articles" ref={node => registerNode(node)}>
      {relatedArticleSlice ? (
        <RelatedArticles
          analyticsStream={analyticsStream}
          isVisible={relatedArticlesVisible}
          slice={relatedArticleSlice}
        />
      ) : null}
    </aside>
    <ArticleComments
      articleId={articleId}
      isEnabled={commentsEnabled}
      spotAccountId={spotAccountId}
    />
  </Fragment>
);

ArticleExtras.propTypes = {
  analyticsStream: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired,
  commentsEnabled: PropTypes.bool.isRequired,
  registerNode: PropTypes.func.isRequired,
  relatedArticleSlice: PropTypes.shape({}).isRequired,
  relatedArticlesVisible: PropTypes.bool.isRequired,
  spotAccountId: PropTypes.string.isRequired,
  topics: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default ArticleExtras;
