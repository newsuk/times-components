import React, { Fragment } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { ResponsiveContext } from "@times-components/responsive";
import ArticleComments from "@times-components/article-comments";
import RelatedArticles from "@times-components/related-articles";
import ArticleTopics from "./article-topics";
import styles from "./styles";

const ArticleExtrasContent = ({
  analyticsStream,
  article,
  articleId,
  articleUrl,
  onCommentGuidelinesPress,
  onCommentsPress,
  onRelatedArticlePress,
  onTopicPress
}) => {
  const { commentsEnabled, relatedArticleSlice, topics } = article;

  return (
    <Fragment>
      {relatedArticleSlice ? (
        <ResponsiveContext.Consumer>
          {({ isTablet }) => (
            <View style={isTablet && styles.relatedArticlesTablet}>
              <RelatedArticles
                analyticsStream={analyticsStream}
                onPress={onRelatedArticlePress}
                slice={relatedArticleSlice}
              />
            </View>
          )}
        </ResponsiveContext.Consumer>
      ) : null}
      {topics ? <ArticleTopics onPress={onTopicPress} topics={topics} /> : null}
      <ArticleComments
        articleId={articleId}
        commentsEnabled={commentsEnabled}
        onCommentGuidelinesPress={onCommentGuidelinesPress}
        onCommentsPress={onCommentsPress}
        url={articleUrl}
      />
    </Fragment>
  );
};

ArticleExtrasContent.propTypes = {
  analyticsStream: PropTypes.func.isRequired,
  article: PropTypes.shape({}).isRequired,
  articleId: PropTypes.string.isRequired,
  articleUrl: PropTypes.string.isRequired,
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  onRelatedArticlePress: PropTypes.func.isRequired,
  onTopicPress: PropTypes.func.isRequired
};

export default ArticleExtrasContent;
