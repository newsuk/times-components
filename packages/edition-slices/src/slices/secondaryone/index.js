import React from "react";
import PropTypes from "prop-types";
import { TileA } from "../../tiles";

const SecondaryOneSlice = ({ onPress, secondary }) => (
  <TileA onPress={onPress} tile={secondary} />
);

SecondaryOneSlice.propTypes = {
  onPress: PropTypes.func.isRequired,
  secondary: PropTypes.shape({}).isRequired
};

export default SecondaryOneSlice;
