/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import { TcView } from "@times-components/utils";
import styleFactory from "./styles";


const SectionItemSeparator = ({ breakpoint }) => {
  const styles = styleFactory(breakpoint);

  return <TcView style={styles.listItemSeparator} />;
};

SectionItemSeparator.propTypes = {
  breakpoint: PropTypes.string
};

export default SectionItemSeparator;
 