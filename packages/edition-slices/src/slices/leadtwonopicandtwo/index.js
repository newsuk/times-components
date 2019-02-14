import React from "react";
import PropTypes from "prop-types";
import { LeadTwoNoPicAndTwoSlice } from "@times-components/slice-layout";
import { TileB, TileD, TileE, TileF } from "../../tiles";

const LeadTwoNoPicAndTwo = ({
  onPress,
  slice: { lead1, lead2, support1, support2 }
}) => (
  <LeadTwoNoPicAndTwoSlice
    renderLead1={() => <TileF onPress={onPress} tile={lead1} />}
    renderLead2={() => <TileB onPress={onPress} tile={lead2} />}
    renderSupport1={() => <TileD onPress={onPress} tile={support1} />}
    renderSupport2={() => <TileE onPress={onPress} tile={support2} />}
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
