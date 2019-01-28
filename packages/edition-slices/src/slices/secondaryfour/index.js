import React from "react";
import PropTypes from "prop-types";
import { SecondaryFourSlice } from "@times-components/slice-layout";
import { PrimaryTile } from "../../tiles";

const SecondaryFour = ({ secondary1, secondary2, secondary3, secondary4 }) => (
  <SecondaryFourSlice
    renderSecondary1={() => (
      <PrimaryTile imagePosition="top" tile={secondary1} />
    )}
    renderSecondary2={() => (
      <PrimaryTile imagePosition="top" tile={secondary2} />
    )}
    renderSecondary3={() => (
      <PrimaryTile imagePosition="top" tile={secondary3} />
    )}
    renderSecondary4={() => (
      <PrimaryTile imagePosition="top" tile={secondary4} />
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
