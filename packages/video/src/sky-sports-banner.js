import React from "react";
import { OverlayGradient } from "@times-components/gradient";
import InnerSkySportsBanner from "./inner-sky-sports-banner";
import styles from "./styles";

const SkySportsBanner = () => (
  <OverlayGradient degrees={180} style={styles.skySportsBanner}>
    <InnerSkySportsBanner />
  </OverlayGradient>
);

export default SkySportsBanner;
