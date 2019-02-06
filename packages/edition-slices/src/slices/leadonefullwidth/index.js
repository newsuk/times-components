import React from "react";
import PropTypes from "prop-types";
import { TileA } from "../../tiles";

const LeadOneFullWidthSlice = ({ lead, onPress }) => (
  <TileA onPress={onPress} tile={lead} />
);

LeadOneFullWidthSlice.propTypes = {
  lead: PropTypes.shape({}).isRequired,
  onPress: PropTypes.func.isRequired
};

export default LeadOneFullWidthSlice;
