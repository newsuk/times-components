import React from "react";
import PropTypes from "prop-types";
import { LeadOneAndOneSlice } from "@times-components/slice-layout";
import { TileA, TileB } from "../../tiles";

const LeadOneAndOne = ({ lead, onPress, support }) => (
  <LeadOneAndOneSlice
    renderLead={() => <TileA onPress={onPress} tile={lead} />}
    renderSupport={() => <TileB onPress={onPress} tile={support} />}
  />
);

LeadOneAndOne.propTypes = {
  lead: PropTypes.shape({}).isRequired,
  onPress: PropTypes.func.isRequired,
  support: PropTypes.shape({}).isRequired
};

export default LeadOneAndOne;
