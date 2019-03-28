import React, { Fragment } from "react";
import { View } from "react-native";
import propTypes from "./proptypes";
import { ItemRowSeparator } from "../shared";

const Column = ({ children, style }) => (
  <View style={style}>
    {children.map((tile, index) => (
      <Fragment key={`${tile.props.tileName}`}>
        {tile}
        {index !== children.length - 1 ? <ItemRowSeparator /> : null}
      </Fragment>
    ))}
  </View>
);

Column.propTypes = propTypes;

export default Column;
