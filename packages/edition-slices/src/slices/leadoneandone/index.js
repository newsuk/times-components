import React from "react";
import PropTypes from "prop-types";
import { LeadOneAndOneSlice } from "@times-components/slice-layout";
import { TileA, TileB } from "../../tiles";

const LeadOneAndOne = ({ onPress, slice: { lead, support } }) => (
  <LeadOneAndOneSlice
    renderLead={() => <TileA onPress={onPress} tile={lead} />}
    renderSupport={() => <TileB onPress={onPress} tile={support} />}
  />
);

LeadOneAndOne.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    lead: PropTypes.shape({}).isRequired,
    support: PropTypes.shape({}).isRequired
  }).isRequired
};

export default LeadOneAndOne;
