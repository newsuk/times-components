import React from "react";
import Image from "@times-components/image";
import styles from "./styles";
import propTypes from "./proptypes";

const MastHead = ({ publicationName }) => {
  let uri = "https://www.thetimes.co.uk/d/img/leaders-masthead-d17db00289.png";
  let aspectRatio = 1435 / 250;
  let style = "mastheadStyleTimes";

  if (publicationName !== "TIMES") {
    style = "mastheadStyleST";
    aspectRatio = 243 / 45;
    uri =
      "https://www.thetimes.co.uk/d/img/logos/sundaytimes-with-crest-black-53d6e31fb8.png";
  }

  return <Image aspectRatio={aspectRatio} style={styles[style]} uri={uri} />;
};

MastHead.propTypes = propTypes;

export default MastHead;
