import React from "react";
import { Image } from "react-native";
import styles from "./styles";

const MastHead = ({publicationName}) => {
  let style = "mastheadStyleST";
  let source = require("../../../assets/st-masthead.png");

  if (publicationName === 'TIMES') {
    style = "mastheadStyleTimes";
    source = require("../../../assets/times-leading-header.png");
  }

  return (
  <Image
    resizeMode="contain"
    // eslint-disable-next-line global-require
    source={source}
    style={styles[style]}
  />
)};

export default MastHead;
