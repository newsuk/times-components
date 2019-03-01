import React from "react";
import { Image } from "react-native";
import styles from "./styles";
import propTypes from "./proptypes";

const MastHead = ({ publicationName }) => {
  let style = "mastheadStyleTimes";
  // eslint-disable-next-line global-require
  let source = require("../../../assets/times-leading-header.png");

  if (publicationName !== "TIMES") {
    style = "mastheadStyleST";
    // eslint-disable-next-line global-require
    source = require("../../../assets/st-masthead.png");
  }

  return <Image resizeMode="contain" source={source} style={styles[style]} />;
};

MastHead.propTypes = propTypes;

export default MastHead;
