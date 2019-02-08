import React from "react";
import { Leaders } from "@times-components/slice-layout";
import PropTypes from "prop-types";
import { TileM } from "../../tiles";

const LeadersSlice = ({ leader1, leader2, leader3, onPress }) => (
  <Leaders
    renderLeader1={() => <TileM onPress={onPress} tile={leader1} />}
    renderLeader2={() => <TileM onPress={onPress} tile={leader2} />}
    renderLeader3={() => <TileM onPress={onPress} tile={leader3} />}
  />
);

LeadersSlice.propTypes = {
  leader1: PropTypes.shape({}).isRequired,
  leader2: PropTypes.shape({}).isRequired,
  leader3: PropTypes.shape({}).isRequired,
  onPress: PropTypes.func.isRequired
};

export default LeadersSlice;
