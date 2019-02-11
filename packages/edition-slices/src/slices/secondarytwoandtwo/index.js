import React from "react";
import PropTypes from "prop-types";
import { SecondaryTwoAndTwoSlice } from "@times-components/slice-layout";
import { TileC, TileG } from "../../tiles";

const SecondaryTwoAndTwo = ({
  onPress,
  secondary1,
  secondary2,
  support1,
  support2
}) => (
  <SecondaryTwoAndTwoSlice
    renderSecondary1={() => <TileC onPress={onPress} tile={secondary1} />}
    renderSecondary2={() => <TileC onPress={onPress} tile={secondary2} />}
    renderSupport1={() => <TileG onPress={onPress} tile={support1} />}
    renderSupport2={() => <TileG onPress={onPress} tile={support2} />}
  />
);

SecondaryTwoAndTwo.propTypes = {
  onPress: PropTypes.func.isRequired,
  secondary1: PropTypes.shape({}).isRequired,
  secondary2: PropTypes.shape({}).isRequired,
  support1: PropTypes.shape({}).isRequired,
  support2: PropTypes.shape({}).isRequired
};

export default SecondaryTwoAndTwo;
