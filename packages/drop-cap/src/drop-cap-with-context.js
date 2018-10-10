import React from "react";
import Context from "@times-components/context";
import DropCap from "./drop-cap";
import { propTypes, defaultProps } from "./prop-types";

const DropCapWrapper = props => (
  <Context.Consumer>
    {({ theme: { scale } }) => <DropCap scale={scale} {...props} />}
  </Context.Consumer>
);

DropCapWrapper.propTypes = propTypes;
DropCapWrapper.defaultProps = defaultProps;

export default DropCapWrapper;
