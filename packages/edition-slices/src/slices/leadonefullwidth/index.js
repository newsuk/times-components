import React from "react";
import PropTypes from "prop-types";
import { TileA } from "../../tiles";

const LeadOneFullWidthSlice = ({ slice: { lead }, onPress }) => (
  <TileA onPress={onPress} tile={lead} />
);

LeadOneFullWidthSlice.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({ lead: PropTypes.shape({}).isRequired }).isRequired
};

export default LeadOneFullWidthSlice;
