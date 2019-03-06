import React from "react";
import PropTypes from "prop-types";
import { SecondaryTwoNoPicAndTwoSlice } from "@times-components/slice-layout";
import { TileAE, TileB, TileG } from "../../tiles";
import { ResponsiveSlice } from "../shared";

const SecondaryTwoNoPicAndTwo = ({
  onPress,
  slice: { secondary1, secondary2, support1, support2 }
}) => (
  <ResponsiveSlice
    renderMedium={editionBreakpoint => (
      <SecondaryTwoNoPicAndTwoSlice
        breakpoint={editionBreakpoint}
        renderSecondary1={() => (
          <TileAE onPress={onPress} tile={secondary1} tileName="secondary1" />
        )}
        renderSecondary2={() => (
          <TileAE onPress={onPress} tile={secondary2} tileName="secondary2" />
        )}
        renderSupport1={() => (
          <TileG onPress={onPress} tile={support1} tileName="support1" />
        )}
        renderSupport2={() => (
          <TileG onPress={onPress} tile={support2} tileName="support2" />
        )}
      />
    )}
    renderSmall={editionBreakpoint => (
      <SecondaryTwoNoPicAndTwoSlice
        breakpoint={editionBreakpoint}
        renderSecondary1={() => (
          <TileB onPress={onPress} tile={secondary1} tileName="secondary1" />
        )}
        renderSecondary2={() => (
          <TileB onPress={onPress} tile={secondary2} tileName="secondary2" />
        )}
        renderSupport1={() => (
          <TileG onPress={onPress} tile={support1} tileName="support1" />
        )}
        renderSupport2={() => (
          <TileG onPress={onPress} tile={support2} tileName="support2" />
        )}
      />
    )}
  />
);

SecondaryTwoNoPicAndTwo.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    secondary1: PropTypes.shape({}).isRequired,
    secondary2: PropTypes.shape({}).isRequired,
    support1: PropTypes.shape({}).isRequired,
    support2: PropTypes.shape({}).isRequired
  }).isRequired
};

export default SecondaryTwoNoPicAndTwo;
