import React from "react";
import styles from "./styles";
import { SkySportsTextContainer } from "./styles/responsive";
import propTypes from "./sky-sports-text-prop-types";

const SkySportsText = ({ text }) => (
  <SkySportsTextContainer style={styles.skySportsBannerText}>
    {text}
  </SkySportsTextContainer>
);

SkySportsText.propTypes = propTypes;

export default SkySportsText;
