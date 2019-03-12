import React from "react";
import PropTypes from "prop-types";
import { LeadTwoNoPicAndTwoSlice } from "@times-components/slice-layout";
import { TileB, TileD, TileE, TileF, TileX, TileY, TileZ } from "../../tiles";
import { ResponsiveSlice } from "../shared";

const LeadTwoNoPicAndTwo = ({
  onPress,
  slice: { lead1, lead2, support1, support2 }
}) => (
  <ResponsiveSlice
    renderMedium={editionBreakpoint => (
      <LeadTwoNoPicAndTwoSlice
        breakpoint={editionBreakpoint}
        renderLead1={() => (
          <TileX onPress={onPress} tile={lead1} tileName="lead1" />
        )}
        renderLead2={() => (
          <TileY onPress={onPress} tile={lead2} tileName="lead2" />
        )}
        renderSupport1={() => (
          <TileD onPress={onPress} tile={support1} tileName="support1" />
        )}
        renderSupport2={() => (
          <TileZ onPress={onPress} tile={support2} tileName="support2" />
        )}
      />
    )}
    renderSmall={editionBreakpoint => (
      <LeadTwoNoPicAndTwoSlice
        breakpoint={editionBreakpoint}
        renderLead1={() => (
          <TileF onPress={onPress} tile={lead1} tileName="lead1" />
        )}
        renderLead2={() => (
          <TileB onPress={onPress} tile={lead2} tileName="lead2" />
        )}
        renderSupport1={() => (
          <TileD onPress={onPress} tile={support1} tileName="support1" />
        )}
        renderSupport2={() => (
          <TileE onPress={onPress} tile={support2} tileName="support2" />
        )}
      />
    )}
  />
);

LeadTwoNoPicAndTwo.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    lead1: PropTypes.shape({}).isRequired,
    lead2: PropTypes.shape({}).isRequired,
    support1: PropTypes.shape({}).isRequired,
    support2: PropTypes.shape({}).isRequired
  }).isRequired
};

export default LeadTwoNoPicAndTwo;
