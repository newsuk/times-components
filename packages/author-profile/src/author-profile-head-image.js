import React from "react";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import sharedStyles from "./newStyles";

const AuthorProfileHeadImage = ({ uri }) => (
  <Image
    aspectRatio={1}
    style={sharedStyles.authorPhoto}
    uri={uri}
    accessibilityLabel="author-image"
  />
);

AuthorProfileHeadImage.propTypes = {
  uri: PropTypes.string
};

AuthorProfileHeadImage.defaultProps = {
  uri: ""
};

export default AuthorProfileHeadImage;
