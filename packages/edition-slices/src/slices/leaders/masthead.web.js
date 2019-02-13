import React from "react";
import Image from "@times-components/image";
import styles from "./styles";

const MastHead = () => (
  <Image
    aspectRatio={1435 / 250}
    style={styles.mastheadStyle}
    uri="https://www.thetimes.co.uk/d/img/leaders-masthead-d17db00289.png"
  />
);

export default MastHead;
