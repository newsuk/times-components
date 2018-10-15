import React from "react";
import { DropCap } from "./styles/responsive";
import { propTypes, defaultProps } from "./prop-types";

const DropCapView = ({ colour, children }) => (
  <DropCap style={{ color: colour }}>{children}</DropCap>
);

DropCapView.propTypes = propTypes;
DropCapView.defaultProps = defaultProps;

export default DropCapView;
