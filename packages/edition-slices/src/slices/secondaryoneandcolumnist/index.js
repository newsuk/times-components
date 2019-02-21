import React from "react";
import PropTypes from "prop-types";
import { SecondaryOneAndColumnistSlice } from "@times-components/slice-layout";
import { TileH, TileT } from "../../tiles";

const SecondaryOneAndColumnist = ({
  onPress,
  slice: { columnist, secondary }
}) => (
  <SecondaryOneAndColumnistSlice
    renderColumnist={() => (
      <TileH onPress={onPress} tile={columnist} tileName="columnist" />
    )}
    renderSecondary={() => (
      <TileT onPress={onPress} tile={secondary} tileName="secondary" />
    )}
  />
);

SecondaryOneAndColumnist.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    columnist: PropTypes.shape({}).isRequired,
    secondary: PropTypes.shape({}).isRequired
  }).isRequired
};

export default SecondaryOneAndColumnist;
