import React from "react";
import PropTypes from "prop-types";
import styles from "../styles";
import { StandfirstContainer } from "../styles/responsive.web";

const HeaderStandfirst = ({ standfirst }) => {
  if (!standfirst) return null;

  return (
    <StandfirstContainer
      accessibilityRole="heading"
      aria-level="2"
      style={styles.standFirst}
      testID="standfirst"
    >
      {standfirst}
    </StandfirstContainer>
  );
};

HeaderStandfirst.propTypes = {
  standfirst: PropTypes.string
};

HeaderStandfirst.defaultProps = {
  standfirst: null
};

export default HeaderStandfirst;
