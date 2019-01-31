import React from "react";
import PropTypes from "prop-types";
import { LeadOneAndTwoSlice } from "@times-components/slice-layout";
import { TileA, TileB } from "../../tiles";

const LeadOneAndOneSlice = ({ lead, support }) => (
  <LeadOneAndTwoSlice
    renderLead={() => <TileA tile={lead} />}
    renderSupport1={() => <TileB tile={support} />}
    renderSupport2={() => null}
  />
);

LeadOneAndOneSlice.propTypes = {
  lead: PropTypes.shape({}).isRequired,
  support: PropTypes.shape({}).isRequired
};

export default LeadOneAndOneSlice;
