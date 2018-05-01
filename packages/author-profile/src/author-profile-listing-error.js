import React from "react";
import { Button, Text, View } from "react-native";
import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";
import styles from "./styles";

const AuthorProfileListingError = ({ refetch }) => (
  <View style={styles.listingErrorContainer}>
    <Text style={styles.listingErrorHeading}>Something&apos;s gone wrong</Text>
    <Text style={styles.listingErrorMessage}>
      We can&apos;t load the page you have requested. Please check your network
      connection and retry to continue
    </Text>
    <View style={styles.listingErrorButtonContainer}>
      <Button
        onPress={refetch}
        title="Retry"
        color={colours.functional.action}
        accessibilityLabel="Retry"
      />
    </View>
  </View>
);

AuthorProfileListingError.propTypes = {
  refetch: PropTypes.func.isRequired
};

export default AuthorProfileListingError;
