import React from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import styleFactory from "./styles";
import { propTypes, defaultProps } from "./proptypes";
import { ItemColSeparator, ItemRowSeparator } from "../shared";

const SecondaryFourSlice = ({
  breakpoint,
  renderSecondary1,
  renderSecondary2,
  renderSecondary3,
  renderSecondary4
}) => {
  const styles = styleFactory(breakpoint);
  if (breakpoint === editionBreakpoints.small) {
    const renderRowOne = [renderSecondary1(), renderSecondary2()];
    const renderRowTwo = [renderSecondary3(), renderSecondary4()];
    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <View key={renderRowOne[0].props.id} style={styles.item}>
            {renderRowOne[0]}
          </View>
          <ItemColSeparator />
          <View key={renderRowOne[1].props.id} style={styles.item}>
            {renderRowOne[1]}
          </View>
        </View>
        <ItemRowSeparator />
        <View style={styles.itemContainer}>
          <View key={renderRowTwo[0].props.id} style={styles.item}>
            {renderRowTwo[0]}
          </View>
          <ItemColSeparator />
          <View key={renderRowTwo[1].props.id} style={styles.item}>
            {renderRowTwo[1]}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.item}>{renderSecondary1()}</View>
      <ItemColSeparator />
      <View style={styles.item}>{renderSecondary2()}</View>
      <ItemColSeparator />
      <View style={styles.item}>{renderSecondary3()}</View>
      <ItemColSeparator />
      <View style={styles.item}>{renderSecondary4()}</View>
    </View>
  );
};

SecondaryFourSlice.propTypes = propTypes;
SecondaryFourSlice.defaultProps = defaultProps;

export default SecondaryFourSlice;
