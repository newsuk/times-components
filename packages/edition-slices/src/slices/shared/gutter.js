import React from "react";
import PropTypes from "prop-types";
import { TcView } from "@times-components/utils";
import { ResponsiveContext } from "@times-components/responsive";
import styleFactory from "./styles";

const Gutter = ({ children }) => (
  <ResponsiveContext.Consumer>
    {({ isTablet, editionBreakpoint }) => {
      const styles = styleFactory(isTablet, editionBreakpoint);

      return <TcView style={styles.gutterStyles}>{children}</TcView>;
    }}
  </ResponsiveContext.Consumer>
);

Gutter.propTypes = {
  children: PropTypes.node.isRequired
};

export default Gutter;
