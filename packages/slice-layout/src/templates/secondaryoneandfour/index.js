import React from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import styleFactory from "./styles";
import propTypes from "./proptypes";
import Column from "../column";
import { ItemColSeparator, ItemRowSeparator } from "../shared";

const SecondaryOneAndFourSlice = ({
  breakpoint,
  renderSecondary,
  renderSupport1,
  renderSupport2,
  renderSupport3,
  renderSupport4
}) => {
  const styles = styleFactory(breakpoint);
  const renderRowOne = renderSecondary();
  if (breakpoint === editionBreakpoints.small) {
    const renderFourRows = [
      renderSupport1,
      renderSupport2,
      renderSupport3,
      renderSupport4
    ];
    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <View key={renderRowOne.props.id}>{renderRowOne}</View>
        </View>
        <Column tiles={renderFourRows} />
      </View>
    );
  }

  const renderColTwo = [renderSupport1(), renderSupport3()];
  const renderColThree = [renderSupport2(), renderSupport4()];
  return (
    <View style={styles.container}>
      <View style={styles.secondaryItemContainer}>
        <View key={renderRowOne.props.id}>{renderRowOne}</View>
      </View>
      <ItemColSeparator style={styles.separator} />
      <View style={styles.itemContainer}>
        <View key={renderColTwo[0].props.id} style={styles.item}>
          {renderColTwo[0]}
        </View>
        <ItemRowSeparator style={styles.separator} />
        <View key={renderColTwo[1].props.id} style={styles.item}>
          {renderColTwo[1]}
        </View>
      </View>
      <ItemColSeparator style={styles.separator} />
      <View style={styles.itemContainer}>
        <View key={renderColThree[0].props.id} style={styles.item}>
          {renderColThree[0]}
        </View>
        <ItemRowSeparator style={styles.separator} />
        <View key={renderColThree[1].props.id} style={styles.item}>
          {renderColThree[1]}
        </View>
      </View>
    </View>
  );
};

SecondaryOneAndFourSlice.propTypes = propTypes;

export default SecondaryOneAndFourSlice;
