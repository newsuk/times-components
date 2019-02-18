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

  const renderCol = [
    renderSecondary1(),
    renderSecondary2(),
    renderSecondary3(),
    renderSecondary4()
  ];
  return (
    <View style={styles.container}>
      <View key={renderCol[0].props.id} style={styles.item}>
        {renderCol[0]}
      </View>
      <ItemColSeparator />
      <View key={renderCol[1].props.id} style={styles.item}>
        {renderCol[1]}
      </View>
      <ItemColSeparator />
      <View key={renderCol[2].props.id} style={styles.item}>
        {renderCol[2]}
      </View>
      <ItemColSeparator />
      <View key={renderCol[3].props.id} style={styles.item}>
        {renderCol[3]}
      </View>
    </View>
  );
};

SecondaryFourSlice.propTypes = propTypes;
SecondaryFourSlice.defaultProps = defaultProps;

export default SecondaryFourSlice;
