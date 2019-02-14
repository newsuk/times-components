import React from "react";
import PropTypes from "prop-types";
import { SecondaryTwoNoPicAndTwoSlice } from "@times-components/slice-layout";
import { TileB, TileG } from "../../tiles";

const SecondaryTwoNoPicAndTwo = ({
  onPress,
  slice: { secondary1, secondary2, support1, support2 }
}) => (
  <SecondaryTwoNoPicAndTwoSlice
    renderSecondary1={() => <TileB onPress={onPress} tile={secondary1} />}
    renderSecondary2={() => <TileB onPress={onPress} tile={secondary2} />}
    renderSupport1={() => <TileG onPress={onPress} tile={support1} />}
    renderSupport2={() => <TileG onPress={onPress} tile={support2} />}
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
