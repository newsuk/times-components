import React from "react";
import PropTypes from "prop-types";
import { checkStylesForUnits } from "@times-components/utils";
import { JobTitle } from "@times-components/ts-newskit";
import styles from "./styles";
import { AuthorProfileHeadJobTitleContainer } from "./styles/responsive";

const AuthorProfileHeadJobTitle = ({
  jobTitle,
  contractualTitle,
  isLargeDevice
}) => (
  <div style={checkStylesForUnits(styles.jobTitleContainer)}>
    <AuthorProfileHeadJobTitleContainer
      role="heading"
      aria-level="2"
      style={checkStylesForUnits(styles.jobTitle)}
    >
      {jobTitle.toLowerCase()}
    </AuthorProfileHeadJobTitleContainer>
    {contractualTitle ? (
      <JobTitle
        contractualTitle={contractualTitle}
        isLargeDevice={isLargeDevice}
      />
    ) : null}
  </div>
);

AuthorProfileHeadJobTitle.propTypes = {
  jobTitle: PropTypes.string.isRequired,
  contractualTitle: PropTypes.string,
  isLargeDevice: PropTypes.bool.isRequired
};

AuthorProfileHeadJobTitle.defaultProps = {
  contractualTitle: ""
};

export default AuthorProfileHeadJobTitle;
