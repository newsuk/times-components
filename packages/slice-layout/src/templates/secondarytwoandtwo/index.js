import React, { Fragment } from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import styleFactory from "./styles";
import { defaultProps, propTypes } from "./proptypes";
import { ItemColSeparator, ItemRowSeparator } from "../shared";

const SecondaryTwoAndTwoSlice = ({
  breakpoint,
  renderSecondary1,
  renderSecondary2,
  renderSupport1,
  renderSupport2
}) => {
  const styles = styleFactory(breakpoint);
  if (breakpoint === editionBreakpoints.small) {
    const renderCol = [renderSecondary1(), renderSecondary2()];
    const renderRow = [renderSupport1(), renderSupport2()];
    return (
      <Fragment>
        <View style={styles.itemContainer}>
          <View key={renderCol[0].props.id} style={styles.itemHalfWidth}>
            {renderCol[0]}
          </View>
          <ItemColSeparator />
          <View key={renderCol[1].props.id} style={styles.itemHalfWidth}>
            {renderCol[1]}
          </View>
        </View>
        <ItemRowSeparator />
        <View key={renderRow[0].props.id}>{renderRow[0]}</View>
        <ItemRowSeparator />
        <View key={renderRow[1].props.id}>{renderRow[1]}</View>
      </Fragment>
    );
  }

  const renderRowOne = [renderSecondary1(), renderSecondary2()];
  const renderRowTwo = [renderSupport1(), renderSupport2()];
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
};

SecondaryTwoAndTwoSlice.propTypes = propTypes;
SecondaryTwoAndTwoSlice.defaultProps = defaultProps;

export default SecondaryTwoAndTwoSlice;
