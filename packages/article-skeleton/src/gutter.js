import React from "react";
import PropTypes from "prop-types";
import { TcView } from "@times-components/utils";
import { tabletWidthMax } from "@times-components/ts-styleguide";
import styles from "./styles/shared";

export const maxWidth = tabletWidthMax;

const Gutter = ({ children, style }) => (
  <TcView style={[style, styles.gutter]}>{children}</TcView>
);

Gutter.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.objectOf({
    overflow: PropTypes.string
  })
};

Gutter.defaultProps = {
  style: {
    overflow: "hidden"
  }
};

export default Gutter;
