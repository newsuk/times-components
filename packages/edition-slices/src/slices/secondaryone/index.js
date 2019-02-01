import React from "react";
import PropTypes from "prop-types";
import { TileA } from "../../tiles";

const SecondaryOneSlice = ({ secondary }) => <TileA tile={secondary} />;

SecondaryOneSlice.propTypes = {
  secondary: PropTypes.shape({}).isRequired
};

export default SecondaryOneSlice;
