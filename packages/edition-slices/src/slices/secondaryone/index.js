import React from "react";
import PropTypes from "prop-types";
import { TileA, TileW } from "../../tiles";
import { ResponsiveSlice } from "../shared";

const SecondaryOneSlice = ({ onPress, slice: { secondary } }) => (
  <ResponsiveSlice
    renderHuge={() => null}
    renderMedium={() => (
      <TileW onPress={onPress} tile={secondary} tileName="secondary" />
    )}
    renderSmall={() => (
      <TileA onPress={onPress} tile={secondary} tileName="secondary" />
    )}
    renderWide={() => null}
  />
);

SecondaryOneSlice.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({ secondary: PropTypes.shape({}).isRequired })
    .isRequired
};

export default SecondaryOneSlice;
