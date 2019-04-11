import React, { Fragment } from "react";
import { View } from "react-native";
import propTypes from "./proptypes";
import { ItemColSeparator } from "../shared";

const HorizontalLayout = ({ containerStyle, tiles }) => (
  <View style={containerStyle}>
    {tiles.map(({ tile, style }, index) => (
      <Fragment key={`${tile.props.tileName}`}>
        <View style={style}>{tile}</View>
        {index !== tiles.length - 1 ? <ItemColSeparator /> : null}
      </Fragment>
    ))}
  </View>
);

HorizontalLayout.propTypes = propTypes;

export default HorizontalLayout;
