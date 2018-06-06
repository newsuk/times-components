import React, { Fragment } from "react";
import { Text } from "react-native";
import styles from "./styles";

const ArticleListError = () => (
  <Fragment>
    <Text style={styles.listErrorHeading}>Something&apos;s gone wrong</Text>
    <Text style={styles.listErrorMessage}>
      We can&apos;t load the page you have requested. Please check your network
      connection and retry to continue
    </Text>
  </Fragment>
);

export default ArticleListError;
