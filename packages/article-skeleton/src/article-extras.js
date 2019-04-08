import React from "react";
import { ActivityIndicator, View } from "react-native";
import PropTypes from "prop-types";
import { ArticleExtrasProvider } from "@times-components/provider";
import { ResponsiveContext } from "@times-components/responsive";
import ArticleComments from "@times-components/article-comments";
import RelatedArticles from "@times-components/related-articles";
import ArticleExtrasError from "./article-extras-error";
import ArticleTopics from "./article-topics";
import styles from "./styles/shared";

const ArticleExtras = ({
  analyticsStream,
  articleId,
  articleUrl,
  onRelatedArticlePress,
  onTopicPress,
  onCommentGuidelinesPress,
  onCommentsPress
}) => (
    <ArticleExtrasProvider debounceTimeMs={0} id={articleId}>
      {({ article, error, isLoading, refetch }) => {
        if (isLoading) {
          return <ActivityIndicator size="large" />;
        }
        if (error) {
          return <ArticleExtrasError refetch={refetch} />;
        }

        const {
          commentCount,
          commentsEnabled,
          relatedArticleSlice,
          topics
        } = article;

        console.log("Related:", relatedArticleSlice);
        return (
          <View>
            {relatedArticleSlice ? <ResponsiveContext.Consumer>
              {({ isTablet }) => (
                <View style={isTablet && styles.relatedArticlesTablet}>
                  <RelatedArticles
                    analyticsStream={analyticsStream}
                    onPress={onRelatedArticlePress}
                    slice={relatedArticleSlice}
                  />
                </View>
              )}
            </ResponsiveContext.Consumer> : null}
            {topics?<ArticleTopics onPress={onTopicPress} topics={topics} />:null}
            <ArticleComments
              articleId={articleId}
              commentCount={commentCount}
              commentsEnabled={commentsEnabled}
              onCommentGuidelinesPress={onCommentGuidelinesPress}
              onCommentsPress={onCommentsPress}
              url={articleUrl}
            />
          </View>
        );
      }}
    </ArticleExtrasProvider>
  );

ArticleExtras.propTypes = {
  analyticsStream: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired,
  articleUrl: PropTypes.string.isRequired,
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  onRelatedArticlePress: PropTypes.func.isRequired,
  onTopicPress: PropTypes.func.isRequired
};

export default ArticleExtras;
