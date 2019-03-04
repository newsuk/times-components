import React from "react";
import PropTypes from "prop-types";
import { SecondaryOneAndColumnistSlice } from "@times-components/slice-layout";
import { TileH, TileT, TileAA, TileAB } from "../../tiles";
import { ResponsiveSlice } from "../shared";

const SecondaryOneAndColumnist = ({
  onPress,
  slice: { columnist, secondary }
}) => (
  <ResponsiveSlice
    renderMedium={breakpoint => (
      <SecondaryOneAndColumnistSlice
        breakpoint={breakpoint}
        renderColumnist={() => (
          <TileAB onPress={onPress} tile={columnist} tileName="columnist" />
        )}
        renderSecondary={() => (
          <TileAA onPress={onPress} tile={secondary} tileName="secondary" />
        )}
      />
    )}
    renderSmall={breakpoint => (
      <SecondaryOneAndColumnistSlice
        breakpoint={breakpoint}
        renderColumnist={() => (
          <TileH onPress={onPress} tile={columnist} tileName="columnist" />
        )}
        renderSecondary={() => (
          <TileT onPress={onPress} tile={secondary} tileName="secondary" />
        )}
      />
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
