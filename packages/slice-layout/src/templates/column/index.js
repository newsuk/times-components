import React, { Fragment } from "react";
import { View } from "react-native";
import propTypes from "./proptypes";
import { ItemRowSeparator } from "../shared";

const Column = ({ style, tiles }) => (
  <View style={style}>
    {tiles.map((tile, index) => (
      <Fragment key={tile().props.id}>
        {tile()}
        {index !== tiles.length - 1 ? <ItemRowSeparator /> : null}
      </Fragment>
    ))}
  </View>
);

Column.propTypes = propTypes;

export default Column;
