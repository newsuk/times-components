import React, { Fragment } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { ItemRowSeparator } from "../shared";

const VerticalLayout = ({ style, tiles }) => (
  <View style={style}>
    {tiles.map((tile, index) => (
      <Fragment key={`${tile.props.tileName}`}>
        {tile}
        {index !== tiles.length - 1 ? <ItemRowSeparator /> : null}
      </Fragment>
    ))}
  </View>
);

VerticalLayout.propTypes = {
  style: PropTypes.shape({}),
  tiles: PropTypes.arrayOf(PropTypes.node).isRequired
};

VerticalLayout.defaultProps = {
  style: {}
};

export default VerticalLayout;
