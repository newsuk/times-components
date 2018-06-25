import React from "react";
import { Broadcast } from "react-broadcast";
import { propTypes, defaultProps } from "./ad-composer-prop-types";

const AdComposer = props => (
  <Broadcast channel="adConfig" value={props.adConfig}>
    {props.children}
  </Broadcast>
);

AdComposer.propTypes = propTypes;
AdComposer.defaultProps = defaultProps;

export default AdComposer;
