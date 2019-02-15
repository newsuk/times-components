import React from "react";
import PropTypes from "prop-types";
import { TileA, TileR } from "../../tiles";
import { ResponsiveSlice } from "../shared";

const LeadOneFullWidthSlice = ({ slice: { lead }, onPress }) => (
  <ResponsiveSlice
    renderMedium={() => <TileR onPress={onPress} tile={lead} />}
    renderSmall={() => <TileA onPress={onPress} tile={lead} />}
  />
);

LeadOneFullWidthSlice.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({ lead: PropTypes.shape({}).isRequired }).isRequired
};

export default LeadOneFullWidthSlice;
