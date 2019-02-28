import React from "react";
import Image from "@times-components/image";
import styles from "./styles";
import propTypes from "./proptypes";

const MastHead = ({ publicationName }) => {
  let uri =
    "https://www.thetimes.co.uk/d/img/logos/sundaytimes-with-crest-black-53d6e31fb8.png";
  let aspectRatio = 243 / 45;
  let style = "mastheadStyleST";

  if (publicationName === "TIMES") {
    style = "mastheadStyleTimes";
    aspectRatio = 1435 / 250;
    uri = "https://www.thetimes.co.uk/d/img/leaders-masthead-d17db00289.png";
  }

  return <Image aspectRatio={aspectRatio} style={styles[style]} uri={uri} />;
};

MastHead.propTypes = propTypes;

export default MastHead;
