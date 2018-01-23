import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
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
    color: "#696969"
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
  },
  imageContainer: {
    alignSelf: "center",
    width: "90%",
    marginTop: 20,
    marginBottom: 20
  }
});

const AuthorProfileError = ({ refetch }) => (
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image
        uri="https://www.thetimes.co.uk/d/img/internal-error-c45d0e8347.png"
        aspectRatio={700 / 770}
      />
    </View>
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
          color="#006699"
          accessibilityLabel="Retry"
        />
      </View>
    </View>
  </View>
);

AuthorProfileError.propTypes = {
  refetch: PropTypes.func.isRequired
};

export default AuthorProfileError;
