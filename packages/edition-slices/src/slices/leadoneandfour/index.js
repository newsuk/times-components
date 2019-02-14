import React from "react";
import PropTypes from "prop-types";
import { LeadOneAndFourSlice } from "@times-components/slice-layout";
import { TileI, TileJ } from "../../tiles";

const LeadOneAndFour = ({
  onPress,
  slice: { lead, support1, support2, support3, support4 }
}) => (
  <LeadOneAndFourSlice
    renderLead={() => <TileI onPress={onPress} tile={lead} />}
    renderSupport1={() => <TileJ onPress={onPress} tile={support1} />}
    renderSupport2={() => <TileJ onPress={onPress} tile={support2} />}
    renderSupport3={() => <TileJ onPress={onPress} tile={support3} />}
    renderSupport4={() => <TileJ onPress={onPress} tile={support4} />}
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
