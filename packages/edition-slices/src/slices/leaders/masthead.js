import React from "react";
import { Image } from "react-native";
import styleFactory from "./styles";
import propTypes from "./proptypes";

const MastHead = ({ publicationName, breakpoint }) => {
  let style = "mastheadStyleTimes";
  // eslint-disable-next-line global-require
  let source = require("../../../assets/times-leading-header.png");
  const styles = styleFactory(breakpoint);

  if (publicationName !== "TIMES") {
    style = "mastheadStyleST";
    // eslint-disable-next-line global-require
    source = require("../../../assets/st-masthead.png");
  }

  return <Image resizeMode="contain" source={source} style={styles[style]} />;
};

MastHead.propTypes = propTypes;

export default MastHead;
