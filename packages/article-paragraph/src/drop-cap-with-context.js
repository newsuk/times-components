import React from "react";
import PropTypes from "prop-types";
import Context from "@times-components/context";
import DropCap from "./drop-cap";
import { propTypes, defaultProps } from "./drop-cap-prop-types";

const DropCapWrapper = props => (
  <Context.Consumer>
    {({ theme: { scale } }) => <DropCap scale={scale} {...props} />}
  </Context.Consumer>
);

DropCapWrapper.propTypes = {
  ...propTypes,
  dropCap: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};
DropCapWrapper.defaultProps = defaultProps;

export default DropCapWrapper;
