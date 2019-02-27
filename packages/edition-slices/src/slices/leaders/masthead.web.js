import React from "react";
import Image from "@times-components/image";
import styles from "./styles";

const MastHead = ({publicationName}) => {
  const uri = publicationName === 'TIMES' ? "https://www.thetimes.co.uk/d/img/leaders-masthead-d17db00289.png" : "https://www.thetimes.co.uk/d/img/logos/sundaytimes-with-crest-black-53d6e31fb8.png";

  return (
  <Image
    aspectRatio={1435 / 250}
    style={styles.mastheadStyle}
    uri={uri}
  />
)};

export default MastHead;
