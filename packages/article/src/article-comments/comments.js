import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import Button from "@times-components/button";
import { TextLink } from "@times-components/link";
import styles from "./styles";

const Comments = ({
  articleId,
  commentCount,
  onCommentGuidelinesPress,
  onCommentsPress,
  url
}) => (
  <View style={styles.container}>
    <Text style={styles.headline}>{`${commentCount} ${
      commentCount === 1 ? "comment" : "comments"
    }`}</Text>
    <Text style={styles.supporting}>
      Comments are subject to our community guidelines, which can be
      viewed&nbsp;
      <TextLink onPress={onCommentGuidelinesPress} style={styles.link}>
        here
      </TextLink>
    </Text>
    <Button
      onPress={e => onCommentsPress(e, { articleId, url })}
      style={styles.button}
      title={commentCount > 0 ? "View comments" : "Post a comment"}
    />
  </View>
);

Comments.propTypes = {
  articleId: PropTypes.string.isRequired,
  commentCount: PropTypes.number.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
};

export default Comments;
