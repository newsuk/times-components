import React from "react";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import styles from "./styles";

const AuthorProfileHeadImage = ({ uri }) => (
  <Image aspectRatio={1} style={styles.authorPhoto} uri={uri} />
);

AuthorProfileHeadImage.propTypes = {
  uri: PropTypes.string.isRequired
};

export default AuthorProfileHeadImage;
