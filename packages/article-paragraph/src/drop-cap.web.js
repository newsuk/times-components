import React from "react";
import { DropCap } from "./styles/responsive";
import { propTypes, defaultProps } from "./prop-types";

const DropCapView = ({ colour, children }) => (
  <DropCap style={{ color: colour }}>{children}</DropCap>
);

DropCap.propTypes = propTypes;
DropCap.defaultProps = defaultProps;

export default DropCapView;
