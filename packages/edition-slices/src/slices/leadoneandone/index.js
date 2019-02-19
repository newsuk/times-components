import React from "react";
import PropTypes from "prop-types";
import { LeadOneAndOneSlice } from "@times-components/slice-layout";
import { TileA, TileB, TileC, TileU } from "../../tiles";
import { ResponsiveSlice } from "../shared";

const LeadOneAndOne = ({ onPress, slice: { lead, support } }) => (
  <ResponsiveSlice
    renderMedium={editionBreakpoint => (
      <LeadOneAndOneSlice
        editionBreakpoint={editionBreakpoint}
        renderLead={() => <TileU onPress={onPress} tile={lead} />}
        renderSupport={() => <TileC onPress={onPress} tile={support} />}
      />
    )}
    renderSmall={editionBreakpoint => (
      <LeadOneAndOneSlice
        editionBreakpoint={editionBreakpoint}
        renderLead={() => <TileA onPress={onPress} tile={lead} />}
        renderSupport={() => <TileB onPress={onPress} tile={support} />}
      />
    )}
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
