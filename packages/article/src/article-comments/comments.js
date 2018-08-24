import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import Context from "@times-components/context";
import Button from "@times-components/button";
import { TextLink } from "@times-components/link";
import styleguide from "@times-components/styleguide";
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
    <Context.Consumer>
      {({ theme: { scale } }) => {
        const themedStyleguide = styleguide({ scale });
        const fontFactory = themedStyleguide.fontFactory({
          font: "supporting",
          fontSize: "button"
        });
        return (
          <Button
            fontSize={fontFactory.fontSize}
            lineHeight={fontFactory.lineHeight}
            onPress={e => onCommentsPress(e, { articleId, url })}
            style={styles.button}
            title={commentCount > 0 ? "View comments" : "Post a comment"}
          />
        );
      }}
    </Context.Consumer>
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
