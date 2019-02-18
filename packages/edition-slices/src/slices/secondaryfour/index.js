import React from "react";
import PropTypes from "prop-types";
import { SecondaryFourSlice } from "@times-components/slice-layout";
import { TileC } from "../../tiles";
import { ResponsiveSlice } from "../shared";

const SecondaryFour = ({
  onPress,
  slice: { secondary1, secondary2, secondary3, secondary4 }
}) => {
  const renderSlice = breakpoint => (
    <SecondaryFourSlice
      breakpoint={breakpoint}
      renderSecondary1={() => <TileC onPress={onPress} tile={secondary1} />}
      renderSecondary2={() => <TileC onPress={onPress} tile={secondary2} />}
      renderSecondary3={() => <TileC onPress={onPress} tile={secondary3} />}
      renderSecondary4={() => <TileC onPress={onPress} tile={secondary4} />}
    />
  );

  return (
    <ResponsiveSlice renderMedium={renderSlice} renderSmall={renderSlice} />
  );
};

SecondaryFour.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    secondary1: PropTypes.shape({}).isRequired,
    secondary2: PropTypes.shape({}).isRequired,
    secondary3: PropTypes.shape({}).isRequired,
    secondary4: PropTypes.shape({}).isRequired
  }).isRequired
};

export default SecondaryFour;
