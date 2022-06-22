import React from "react";
import { TcView } from "@times-components/utils";
import PropTypes from "prop-types";
import styles from "./styles";

const ItemColSeparator = ({ style }) => (
  <TcView style={{ ...styles.itemColSeparator, ...style }} />
);
const ItemRowSeparator = ({ style }) => (
  <TcView style={{ ...styles.itemRowSeparator, ...style }} />
);

ItemColSeparator.defaultProps = {
  style: {}
};

ItemRowSeparator.defaultProps = {
  style: {}
};

ItemColSeparator.propTypes = {
  style: PropTypes.shape({})
};

ItemRowSeparator.propTypes = {
  style: PropTypes.shape({})
};

export { ItemColSeparator, ItemRowSeparator };
