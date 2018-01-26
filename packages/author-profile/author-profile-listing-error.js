import React from "react";
import { Colours } from "@times-components/styleguide";
import { Text, View, Button, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "space-between",
    maxWidth: 548
  },
  heading: {
    alignSelf: "center",
    fontFamily: "TimesModern-Bold",
    fontSize: 35,
    textAlign: "center",
    color: "#000000",
    marginBottom: 12
  },
  message: {
    alignSelf: "center",
    fontFamily: "TimesDigitalW04-Regular",
    fontSize: 18,
    textAlign: "center",
    color: Colours.midGrey
  },
  buttonContainer: {
    justifyContent: "flex-end"
  },
  messagingContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignSelf: "center",
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5
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
        color={Colours.linkBlue}
        accessibilityLabel="Retry"
      />
    </View>
  </View>
);

AuthorProfileListingError.propTypes = {
  refetch: PropTypes.func.isRequired
};

export default AuthorProfileListingError;
