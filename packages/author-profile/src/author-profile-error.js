import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import { spacing } from "@times-components/styleguide";
import AuthorProfileListError from "./author-profile-list-error";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: spacing(2)
  },
  imageContainer: {
    alignSelf: "center",
    width: "60%",
    marginTop: spacing(4),
    marginBottom: spacing(4)
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
    <AuthorProfileListError refetch={refetch} />
  </View>
);

AuthorProfileError.propTypes = {
  refetch: PropTypes.func.isRequired
};

export default AuthorProfileError;
