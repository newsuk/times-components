import React from "react";
import PropTypes from "prop-types";
import { TileA } from "../../tiles";

const LeadOneFullWidthSlice = ({ lead }) => <TileA tile={lead} />;

LeadOneFullWidthSlice.propTypes = {
  lead: PropTypes.shape({}).isRequired
};

export default LeadOneFullWidthSlice;
