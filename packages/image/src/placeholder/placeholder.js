/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import { TcView } from "@times-components/utils";
import styles from "../styles/index";
import T from "../logo/t";

function Placeholder({ borderRadius = 0 }) {
  const viewStyles = {
    ...styles.placeholder,
    borderRadius
  };
  return (
    <TcView height="100%" style={viewStyles} width="100%">
      <T />
    </TcView>
  );
}

Placeholder.propTypes = {
  borderRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Placeholder;
