import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import Button from "@times-components/button";
import { TextLink } from "@times-components/link";

const ArticleComments = ({
  articleId,
  commentCount,
  onCommentsPress,
  onCommentGuidelinesPress,
  url
}) => (
  <View>
    <Text>{commentCount} comments</Text>
    <Text>
      Comments are subject to our community guidelines, which can be
      viewed&nbsp;
      <TextLink onPress={onCommentGuidelinesPress} url={url}>
        here
      </TextLink>
    </Text>
    <Button
      onPress={e => onCommentsPress(e, { articleId, url })}
      title="View Comments"
    />
  </View>
);

ArticleComments.propTypes = {
  articleId: PropTypes.string.isRequired,
  commentCount: PropTypes.number.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
};

export default ArticleComments;
