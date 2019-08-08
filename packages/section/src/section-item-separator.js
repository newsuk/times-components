/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styleFactory from "./styles";

const SectionItemSeparator = ({ breakpoint }) => {
  const styles = styleFactory(breakpoint);

  return <View style={styles.listItemSeparator} />;
};

SectionItemSeparator.propTypes = {
  breakpoint: PropTypes.string
};

export default SectionItemSeparator;
