import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import Button from "@times-components/button";
import { TextLink } from "@times-components/link";
import styles from "./styles";

const ArticleComments = ({
  articleId,
  commentCount,
  commentsEnabled,
  onCommentsPress,
  onCommentGuidelinesPress,
  url
}) =>
  commentsEnabled ? (
    <View style={styles.container}>
      <Text style={styles.headline}>{`${commentCount} comment${
        commentCount === 1 ? "" : "s"
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
  ) : (
    <View style={styles.container}>
      <Text style={styles.headline}>
        Comments for this article have been turned off
      </Text>
      <Text style={styles.supporting}>
        For more details, please see our {"\n"}
        <TextLink onPress={onCommentGuidelinesPress} style={styles.link}>
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
