import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import Button from "@times-components/button";
import Context from "@times-components/context";
import styleguide from "@times-components/styleguide";
import styles from "./styles";

const ArticleExtrasError = ({ refetch }) => (
  <View style={styles.extrasErrorContainer}>
    <Text style={styles.extrasErrorHeadline}>
      It looks like you&apos;re offline
    </Text>
    <Text style={styles.extrasErrorBody}>
      Some features, such as related articles and comments, may not be avalaible
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
            style={styles.extrasErrorButton}
            title="Retry"
          />
        );
      }}
    </Context.Consumer>
  </View>
);

ArticleExtrasError.propTypes = {
  refetch: PropTypes.func.isRequired
};

export default ArticleExtrasError;
