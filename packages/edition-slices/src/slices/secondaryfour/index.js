import React from "react";
import PropTypes from "prop-types";
import { SecondaryFourSlice } from "@times-components/slice-layout";
import { TileC } from "../../tiles";

const SecondaryFour = ({
  onPress,
  secondary1,
  secondary2,
  secondary3,
  secondary4
}) => (
  <SecondaryFourSlice
    renderSecondary1={() => <TileC onPress={onPress} tile={secondary1} />}
    renderSecondary2={() => <TileC onPress={onPress} tile={secondary2} />}
    renderSecondary3={() => <TileC onPress={onPress} tile={secondary3} />}
    renderSecondary4={() => <TileC onPress={onPress} tile={secondary4} />}
  />
);

SecondaryFour.propTypes = {
  onPress: PropTypes.func.isRequired,
  secondary1: PropTypes.shape({}).isRequired,
  secondary2: PropTypes.shape({}).isRequired,
  secondary3: PropTypes.shape({}).isRequired,
  secondary4: PropTypes.shape({}).isRequired
};

export default SecondaryFour;
