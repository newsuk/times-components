import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import Button from "@times-components/button";
import Context from "@times-components/context";
import styleguide from "@times-components/styleguide";
import styles from "./styles";

const CommentError = ({ refetch }) => (
  <View style={styles.container}>
    <Text style={styles.headline}>Unable to load comments</Text>
    <Text style={styles.errorBody}>
      You must have a network connection to view and post comments. Please check
      your connection and retry.
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
            onPress={refetch}
            style={styles.errorButton}
            title="Retry"
          />
        );
      }}
    </Context.Consumer>
  </View>
);

CommentError.propTypes = {
  refetch: PropTypes.func.isRequired
};

export default CommentError;
