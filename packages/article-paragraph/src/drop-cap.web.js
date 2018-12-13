import React from "react";
import PropTypes from "prop-types";
import { DropCap } from "./styles/responsive";
import { propTypes, defaultProps } from "./drop-cap-prop-types";

const DropCapView = ({ colour, children, font }) => (
  <DropCap style={{ color: colour, fontFamily: font }}>{children}</DropCap>
);

DropCapView.propTypes = {
  ...propTypes,
  children: PropTypes.string.isRequired
};

DropCapView.defaultProps = defaultProps;

export default DropCapView;
