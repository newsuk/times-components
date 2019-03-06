import React from "react";
import propTypes from "./proptypes";
import Column from "../column";

const SecondaryOneAndColumnistSlice = ({
  renderSecondary,
  renderColumnist
}) => <Column tiles={[renderSecondary, renderColumnist]} />;

SecondaryOneAndColumnistSlice.propTypes = propTypes;

export default SecondaryOneAndColumnistSlice;
