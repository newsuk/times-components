import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import AuthorProfileListError from "./author-profile-list-error";
import styles from "./styles";

// todo: embed image in case of network loss causing the error
const AuthorProfileError = ({ refetch }) => (
  <View style={styles.pageErrorContainer}>
    <View style={styles.pageErrorImageContainer}>
      <Image
        aspectRatio={700 / 770}
        uri="https://www.thetimes.co.uk/d/img/internal-error-c45d0e8347.png"
      />
    </View>
    <AuthorProfileListError refetch={refetch} />
  </View>
);

AuthorProfileError.propTypes = {
  refetch: PropTypes.func.isRequired
};

export default AuthorProfileError;
