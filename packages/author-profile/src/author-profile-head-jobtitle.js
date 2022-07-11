import React from "react";
import PropTypes from "prop-types";
import { checkStylesForUnits } from "@times-components/utils";
import styles from "./styles";
import { AuthorProfileHeadJobTitleContainer } from "./styles/responsive";

const AuthorProfileHeadJobTitle = ({ jobTitle }) => (
  <AuthorProfileHeadJobTitleContainer
    role="heading"
    aria-level="2"
    style={checkStylesForUnits(styles.jobTitle)}
  >
    {jobTitle.toLowerCase()}
  </AuthorProfileHeadJobTitleContainer>
);

AuthorProfileHeadJobTitle.propTypes = {
  jobTitle: PropTypes.string.isRequired
};

export default AuthorProfileHeadJobTitle;
