import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "space-between",
    maxWidth: 548
  },
  heading: {
    alignSelf: "center",
    fontFamily: fonts.headline,
    fontSize: fontSizes.leadHeadline,
    textAlign: "center",
    color: colours.functional.brandColour,
    marginBottom: 12
  },
  message: {
    alignSelf: "center",
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.body,
    textAlign: "center",
    color: colours.functional.secondary
  },
  buttonContainer: {
    justifyContent: "flex-end"
  },
  messagingContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignSelf: "center",
    marginTop: spacing(4),
    marginLeft: spacing(1),
    marginRight: spacing(1)
  }
});

const AuthorProfileListingError = ({ refetch }) => (
  <View style={styles.body}>
    <View style={styles.messagingContainer}>
      <Text style={styles.heading}>Something&apos;s gone wrong</Text>
      <Text style={styles.message}>
        We can&apos;t load the page you have requested. Please check your
        network connection and retry to continue
      </Text>
    </View>
    <View style={styles.buttonContainer}>
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
