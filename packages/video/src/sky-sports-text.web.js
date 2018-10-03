import React from "react";
import styles from "./styles";
import SkySportsTextContainer from "./styles/responsive";
import SkySportsTextBase from "./sky-sports-text.base";

const SkySportsText = () => (
  <SkySportsTextContainer style={styles.skySportsBannerText}>
    <SkySportsTextBase />
  </SkySportsTextContainer>
);

export default SkySportsText;
