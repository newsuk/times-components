import React from "react";
import PropTypes from "prop-types";
import newStyles from "../newStyles";
import { StandfirstContainer } from "../newStyles/responsive";

const HeaderStandfirst = ({ standfirst }) => {
  if (!standfirst) return null;

  return (
    <StandfirstContainer
      role="header"
      aria-level="2"
      styles={newStyles.standFirst}
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
