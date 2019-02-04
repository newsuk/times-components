import React from "react";
import PropTypes from "prop-types";
import { LeadOneAndTwoSlice } from "@times-components/slice-layout";
import { TileLink } from "../../tiles/shared";
import { TileA, TileB } from "../../tiles";

const LeadOneAndOneSlice = ({ lead, onPress, support }) => (
  <LeadOneAndTwoSlice
    renderLead={() => (
      <TileLink onPress={onPress} tile={lead}>
        <TileA tile={lead} />
      </TileLink>
    )}
    renderSupport1={() => (
      <TileLink onPress={onPress} tile={support}>
        <TileB tile={support} />
      </TileLink>
    )}
    renderSupport2={() => null}
  />
);

LeadOneAndOneSlice.propTypes = {
  lead: PropTypes.shape({}).isRequired,
  onPress: PropTypes.func.isRequired,
  support: PropTypes.shape({}).isRequired
};

export default LeadOneAndOneSlice;
