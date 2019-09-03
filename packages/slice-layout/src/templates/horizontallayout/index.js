import React, { Fragment } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { ItemColSeparator } from "../shared";

const HorizontalLayout = ({ containerStyle, tiles, colSeparatorStyle }) => (
  <View style={containerStyle}>
    {tiles.map(({ tile, style }, index) => (
      <Fragment key={`${tile.props.tileName}`}>
        <View style={style}>{tile}</View>
        {index !== tiles.length - 1 ? (
          <ItemColSeparator style={colSeparatorStyle} />
        ) : null}
      </Fragment>
    ))}
  </View>
);

HorizontalLayout.propTypes = {
  containerStyle: PropTypes.shape({}),
  colSeparatorStyle: PropTypes.shape({}),
  tiles: PropTypes.arrayOf(
    PropTypes.shape({
      style: PropTypes.object,
      tile: PropTypes.node.isRequired
    })
  ).isRequired
};

HorizontalLayout.defaultProps = {
  containerStyle: {},
  colSeparatorStyle: {}
};

export default HorizontalLayout;
