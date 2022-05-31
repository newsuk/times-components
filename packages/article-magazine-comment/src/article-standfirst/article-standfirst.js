import React from "react";
import PropTypes from "prop-types";
import styles from "../styles";
import { StandfirstContainer } from "../styles/responsive";

const HeaderStandfirst = ({ standfirst }) => {
  if (!standfirst) return null;

  return (
    <StandfirstContainer
      role="heading"
      aria-level="2"
      styles={styles.standFirst}
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
