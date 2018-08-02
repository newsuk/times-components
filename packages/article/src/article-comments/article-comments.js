import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import Button from "@times-components/button";
import { TextLink } from "@times-components/link";

const ArticleComments = ({
  articleId,
  commentCount,
  commentsEnabled,
  onCommentsPress,
  onCommentGuidelinesPress,
  url
}) =>
  commentsEnabled ? (
    <View>
      <Text>{commentCount} comments</Text>
      <Text>
        Comments are subject to our community guidelines, which can be
        viewed&nbsp;
        <TextLink onPress={onCommentGuidelinesPress}>here</TextLink>
      </Text>
      <Button
        onPress={e => onCommentsPress(e, { articleId, url })}
        title={commentCount > 0 ? "View comments" : "Post a comment"}
      />
    </View>
  ) : (
    <View>
      <Text>Comments for this article have been turned off</Text>
      <Text>
        For more details, please see our&nbsp;
        <TextLink onPress={onCommentGuidelinesPress}>
          community guidelines
        </TextLink>
      </Text>
    </View>
  );

ArticleComments.propTypes = {
  articleId: PropTypes.string.isRequired,
  commentCount: PropTypes.number.isRequired,
  commentsEnabled: PropTypes.bool.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
};

export default ArticleComments;
