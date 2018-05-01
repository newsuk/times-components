import React from "react";
import { Button, Text, View } from "react-native";
import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";
import styles from "./styles";

const AuthorProfileListError = ({ refetch }) => (
  <View style={styles.listErrorContainer}>
    <Text style={styles.listErrorHeading}>Something&apos;s gone wrong</Text>
    <Text style={styles.listErrorMessage}>
      We can&apos;t load the page you have requested. Please check your network
      connection and retry to continue
    </Text>
    <View style={styles.listErrorButtonContainer}>
      <Button
        onPress={refetch}
        title="Retry"
        color={colours.functional.action}
        accessibilityLabel="Retry"
      />
    </View>
  </View>
);

AuthorProfileListError.propTypes = {
  refetch: PropTypes.func.isRequired
};

export default AuthorProfileListError;
