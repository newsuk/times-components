import React from "react";
import PropTypes from "prop-types";
import { SecondaryFourSlice } from "@times-components/slice-layout";
import { SecondaryTileImageReversed } from "../../tiles";

const SecondaryFour = ({ secondary1, secondary2, secondary3, secondary4 }) => (
  <SecondaryFourSlice
    renderSecondary1={() => (
      <SecondaryTileImageReversed tile={secondary1} withImage />
    )}
    renderSecondary2={() => (
      <SecondaryTileImageReversed tile={secondary2} withImage />
    )}
    renderSecondary3={() => (
      <SecondaryTileImageReversed tile={secondary3} withImage />
    )}
    renderSecondary4={() => (
      <SecondaryTileImageReversed tile={secondary4} withImage />
    )}
  />
);

SecondaryFour.propTypes = {
  secondary1: PropTypes.shape({}).isRequired,
  secondary2: PropTypes.shape({}).isRequired,
  secondary3: PropTypes.shape({}).isRequired,
  secondary4: PropTypes.shape({}).isRequired
};

export default SecondaryFour;
