import React from "react";
import PropTypes from "prop-types";
import { DropCap } from "./styles/responsive";
import { propTypes, defaultProps } from "./drop-cap-prop-types";

function DropCapView({ colour, children, font }) {
  return (
    <DropCap font={font} style={{ color: colour }}>
      {children}
    </DropCap>
  );
}

DropCapView.propTypes = {
  ...propTypes,
  children: PropTypes.string.isRequired
};

DropCapView.defaultProps = defaultProps;

export default DropCapView;
