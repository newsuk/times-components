import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import { TextLink } from "@times-components/link";
import styles from "./styles";

const ArticleListError = ({ refetch }) => (
  <Fragment>
    <Text style={styles.listErrorHeading}>Something&apos;s gone wrong</Text>
    <Text style={styles.listErrorMessage}>
      We can&apos;t load the page you have requested. Please check your network
      connection and{" "}
    </Text>
    <TextLink
      onPress={e => {
        e.preventDefault();
        refetch();
      }}
      url="#"
    >
      retry
    </TextLink>
    <Text>.</Text>
  </Fragment>
);

ArticleListError.propTypes = {
  refetch: PropTypes.func.isRequired
};

export default ArticleListError;
