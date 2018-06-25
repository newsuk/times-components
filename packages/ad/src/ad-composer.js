import React from "react";
import { Broadcast } from "react-broadcast";
import { propTypes, defaultProps } from "./ad-composer-prop-types";

const AdComposer = ({ adConfig, children }) => (
  <Broadcast channel="adConfig" value={adConfig}>
    {children}
  </Broadcast>
);

AdComposer.propTypes = propTypes;
AdComposer.defaultProps = defaultProps;

export default AdComposer;
