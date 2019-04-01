import React, { Fragment } from "react";
import { View } from "react-native";
import propTypes from "./proptypes";
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

VerticalLayout.propTypes = propTypes;

export default VerticalLayout;
