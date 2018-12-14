import React from "react";
import PropTypes from "prop-types";
import { dropCap } from "./styles/responsive";
import { propTypes, defaultProps } from "./drop-cap-prop-types";

const DropCapView = ({ colour, children, font }) => {
  const DropCapWithFont = dropCap(font);
  return (
    <DropCapWithFont style={{ color: colour }}>{children}</DropCapWithFont>
  );
};

DropCapView.propTypes = {
  ...propTypes,
  children: PropTypes.string.isRequired
};

DropCapView.defaultProps = defaultProps;

export default DropCapView;
