import React, { Fragment } from "react";
import { View } from "react-native";
import { ItemRowSeparator } from "./index";

const ColumnLayout = ({tiles}) => (
  <View>
    {tiles.map((tile, index) => (
        <Fragment>
          {tile()}
          {index !== tiles.length - 1 ? <ItemRowSeparator /> : null}
        </Fragment>
      )
    )}
  </View>
);

export default ColumnLayout;
