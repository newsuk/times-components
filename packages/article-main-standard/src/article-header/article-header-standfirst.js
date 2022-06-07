import React from "react";
import PropTypes from "prop-types";
import { TcText, checkStylesForUnits } from "@times-components/utils";
import styles from "../styles/article-header";

const HeaderStandfirst = ({ hasFlags, standfirst }) => {
  if (!standfirst) return null;

  const standFirstStyles = {
    ...styles.standFirst
  };

  if (!hasFlags && styles?.standFirstWithoutFlags) {
    Object.assign(standFirstStyles, ...styles.standFirstWithoutFlags);
  }

  return (
    <TcText
      role="heading"
      aria-level="2"
      style={checkStylesForUnits(standFirstStyles)}
      data-testid="standfirst"
    >
      {standfirst}
    </TcText>
  );
};

HeaderStandfirst.propTypes = {
  hasFlags: PropTypes.bool.isRequired,
  standfirst: PropTypes.string
};

HeaderStandfirst.defaultProps = {
  standfirst: null
};

export default HeaderStandfirst;
