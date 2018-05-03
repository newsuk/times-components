import React from "react";
import { View } from "react-native";
import Image from "@times-components/image";
import AuthorProfileListError from "./author-profile-list-error";
import propTypes from "./author-profile-list-error-prop-types";
import styles from "./styles";

// @TODO: embed image in case of network loss causing the error?
// https://github.com/newsuk/times-components/issues/918
const AuthorProfileListPageError = ({ refetch }) => (
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

AuthorProfileListPageError.propTypes = propTypes;

export default AuthorProfileListPageError;
