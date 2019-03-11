import React from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import styleFactory from "./styles";
import Column from "../column";
import { ItemColSeparator } from "../shared";
import propTypes from "./proptypes";

const Leaders = ({
  renderLeader1,
  renderLeader2,
  renderLeader3,
  breakpoint
}) => {
  const styles = styleFactory(breakpoint);

  if (breakpoint === editionBreakpoints.small) {
    return (
      <Column
        style={styles.container}
        tiles={[renderLeader1, renderLeader2, renderLeader3]}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.columnItems}>{renderLeader2()}</View>
      <ItemColSeparator />
      <View style={styles.columnItems}>{renderLeader1()}</View>
      <ItemColSeparator />
      <View style={styles.columnItems}>{renderLeader3()}</View>
    </View>
  );
};

Leaders.propTypes = propTypes;

export default Leaders;
