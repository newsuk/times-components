import React from "react";
import PropTypes from "prop-types";
import { TileA } from "../../tiles";

const SecondaryOneSlice = ({ onPress, slice: { secondary } }) => (
  <TileA onPress={onPress} tile={secondary} />
);

SecondaryOneSlice.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({ secondary: PropTypes.shape({}).isRequired })
    .isRequired
};

export default SecondaryOneSlice;
