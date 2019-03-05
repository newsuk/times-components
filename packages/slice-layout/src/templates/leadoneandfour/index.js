import React, { Fragment } from "react";
import propTypes from "./proptypes";
import Column from "../column";

const leadOneAndFourSlice = ({
  renderLead,
  renderSupport1,
  renderSupport2,
  renderSupport3,
  renderSupport4
}) => (
  <Fragment>
    {renderLead()}
    <Column
      tiles={[renderSupport1, renderSupport2, renderSupport3, renderSupport4]}
    />
  </Fragment>
);

leadOneAndFourSlice.propTypes = propTypes;

export default leadOneAndFourSlice;
