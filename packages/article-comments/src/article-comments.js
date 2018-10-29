import React from "react";
import { ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { ArticleCommentsProvider } from "@times-components/provider";
import Comments from "./comments";
import DisabledComments from "./disabled-comments";
import CommentError from "./comment-error";

const ArticleComments = ({
  articleId,
  onCommentGuidelinesPress,
  onCommentsPress,
  url
}) => (
  <ArticleCommentsProvider debounceTimeMs={0} id={articleId}>
    {({ article, error, isLoading, refetch }) => {
      if (isLoading) {
        return <ActivityIndicator size="large" />;
      }
      if (error) {
        return <CommentError refetch={refetch} />;
      }

      const { commentCount, commentsEnabled } = article;
      return commentsEnabled ? (
        <Comments
          articleId={articleId}
          commentCount={commentCount}
          onCommentGuidelinesPress={onCommentGuidelinesPress}
          onCommentsPress={onCommentsPress}
          url={url}
        />
      ) : (
        <DisabledComments onCommentGuidelinesPress={onCommentGuidelinesPress} />
      );
    }}
  </ArticleCommentsProvider>
);

ArticleComments.propTypes = {
  articleId: PropTypes.string.isRequired,
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
};

export default ArticleComments;
