import React from "react";
import propTypes from "./proptypes";
import Column from "../column";

const SecondaryTwoNoPicAndTwoSlice = ({
  renderSecondary1,
  renderSecondary2,
  renderSupport1,
  renderSupport2
}) => (
  <Column
    tiles={[renderSecondary1, renderSecondary2, renderSupport1, renderSupport2]}
  />
);

SecondaryTwoNoPicAndTwoSlice.propTypes = propTypes;

export default SecondaryTwoNoPicAndTwoSlice;
