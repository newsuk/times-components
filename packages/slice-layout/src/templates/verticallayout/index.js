import React from "react";
import PropTypes from "prop-types";
import ListVerticalLayout from "./list";
import SimpleVerticalLayout from "./simple";

const VerticalLayout = ({ style, tiles }) =>
  tiles.length >= 10 ? (
    <ListVerticalLayout style={style} tiles={tiles} />
  ) : (
    <SimpleVerticalLayout style={style} tiles={tiles} />
  );

VerticalLayout.propTypes = {
  style: PropTypes.shape({}),
  tiles: PropTypes.arrayOf(PropTypes.node).isRequired
};

VerticalLayout.defaultProps = {
  style: {}
};

export default VerticalLayout;
