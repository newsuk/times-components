import React from "react";
import PropTypes from "prop-types";
import { SecondaryTile } from "../../tiles";

const SecondaryOneSlice = ({ secondary }) => <SecondaryTile tile={secondary} />;

SecondaryOneSlice.propTypes = {
  secondary: PropTypes.shape({}).isRequired
};

export default SecondaryOneSlice;
