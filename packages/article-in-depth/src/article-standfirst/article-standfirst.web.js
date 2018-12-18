import React from "react";
import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";
import styles from "../styles";
import { StandfirstContainer } from "../styles/responsive.web";

const HeaderStandfirst = ({ standfirst, color }) => {
  if (!standfirst) return null;

  return (
    <StandfirstContainer
      accessibilityRole="heading"
      aria-level="2"
      style={[styles.standFirst, { color }]}
      testID="standfirst"
    >
      {standfirst}
    </StandfirstContainer>
  );
};

HeaderStandfirst.propTypes = {
  color: PropTypes.string,
  standfirst: PropTypes.string
};

HeaderStandfirst.defaultProps = {
  color: colours.functional.white,
  standfirst: null
};

export default HeaderStandfirst;
