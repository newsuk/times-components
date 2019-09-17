import React, { Fragment } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { ItemRowSeparator } from "../shared";

const SimpleVerticalLayout = ({ style, tiles }) => (
  <View style={style}>
    {tiles.map((tile, index) => (
      <Fragment key={`${tile.props.tileName}`}>
        {tile}
        {index !== tiles.length - 1 ? <ItemRowSeparator /> : null}
      </Fragment>
    ))}
  </View>
);

SimpleVerticalLayout.propTypes = {
  style: PropTypes.shape({}),
  tiles: PropTypes.arrayOf(PropTypes.node).isRequired
};

SimpleVerticalLayout.defaultProps = {
  style: {}
};

export default SimpleVerticalLayout;
