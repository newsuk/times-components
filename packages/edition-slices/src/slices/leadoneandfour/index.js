import React from "react";
import PropTypes from "prop-types";
import { LeadOneAndFourSlice } from "@times-components/slice-layout";
import { TileAC, TileAD, TileI, TileJ } from "../../tiles";
import { ResponsiveSlice } from "../shared";

const LeadOneAndFour = ({
  onPress,
  slice: { lead, support1, support2, support3, support4 }
}) => (
  <ResponsiveSlice
    renderMedium={breakpoint => (
      <LeadOneAndFourSlice
        breakpoint={breakpoint}
        renderLead={() => (
          <TileAC onPress={onPress} tile={lead} tileName="lead" />
        )}
        renderSupport1={() => (
          <TileAD onPress={onPress} tile={support1} tileName="support1" />
        )}
        renderSupport2={() => (
          <TileAD onPress={onPress} tile={support2} tileName="support2" />
        )}
        renderSupport3={() => (
          <TileAD onPress={onPress} tile={support3} tileName="support3" />
        )}
        renderSupport4={() => (
          <TileAD onPress={onPress} tile={support4} tileName="support4" />
        )}
      />
    )}
    renderSmall={breakpoint => (
      <LeadOneAndFourSlice
        breakpoint={breakpoint}
        renderLead={() => (
          <TileI onPress={onPress} tile={lead} tileName="lead" />
        )}
        renderSupport1={() => (
          <TileJ onPress={onPress} tile={support1} tileName="support1" />
        )}
        renderSupport2={() => (
          <TileJ onPress={onPress} tile={support2} tileName="support2" />
        )}
        renderSupport3={() => (
          <TileJ onPress={onPress} tile={support3} tileName="support3" />
        )}
        renderSupport4={() => (
          <TileJ onPress={onPress} tile={support4} tileName="support4" />
        )}
      />
    )}
  />
);

LeadOneAndFour.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    lead: PropTypes.shape({}).isRequired,
    support1: PropTypes.shape({}).isRequired,
    support2: PropTypes.shape({}).isRequired,
    support3: PropTypes.shape({}).isRequired,
    support4: PropTypes.shape({}).isRequired
  }).isRequired
};

export default LeadOneAndFour;
