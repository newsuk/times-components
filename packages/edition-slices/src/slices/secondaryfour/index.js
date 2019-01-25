import React from "react";
import PropTypes from "prop-types";
import { SecondaryFourSlice } from "@times-components/slice-layout";
import { PrimaryTile } from "../../tiles";

const SecondaryFour = ({ secondary1, secondary2, secondary3, secondary4 }) => (
  <SecondaryFourSlice
    renderSecondary1={() => (
      <PrimaryTile tile={secondary1} withImagePosition="top" />
    )}
    renderSecondary2={() => (
      <PrimaryTile tile={secondary2} withImagePosition="top" />
    )}
    renderSecondary3={() => (
      <PrimaryTile tile={secondary3} withImagePosition="top" />
    )}
    renderSecondary4={() => (
      <PrimaryTile tile={secondary4} withImagePosition="top" />
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