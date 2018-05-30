import React from "react";
import { Text, View } from "react-native";
import ButtonPrimary from "@times-components/button-primary";
import propTypes from "./article-list-error-prop-types";
import styles from "./styles";

const ArticleListError = ({ refetch }) => (
  <View style={styles.listErrorContainer}>
    <Text style={styles.listErrorHeading}>Something&apos;s gone wrong</Text>
    <Text style={styles.listErrorMessage}>
      We can&apos;t load the page you have requested. Please check your network
      connection and retry to continue
    </Text>
    <ButtonPrimary
      onPress={refetch}
      style={styles.retryButton}
      title="Retry"
    />
  </View>
);

ArticleListError.propTypes = propTypes;

export default ArticleListError;
