import React from "react";
import PropTypes from "prop-types";
import { LeadOneAndTwoSlice } from "@times-components/slice-layout";
import { TileA, TileB } from "../../tiles";

const LeadOneAndOneSlice = ({ lead, onPress, support }) => (
  <LeadOneAndTwoSlice
    renderLead={() => <TileA onPress={onPress} tile={lead} />}
    renderSupport1={() => <TileB onPress={onPress} tile={support} />}
    renderSupport2={() => null}
  />
);

LeadOneAndOneSlice.propTypes = {
  lead: PropTypes.shape({}).isRequired,
  onPress: PropTypes.func.isRequired,
  support: PropTypes.shape({}).isRequired
};

export default LeadOneAndOneSlice;
