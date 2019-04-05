import React, { Fragment } from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import propTypes from "./proptypes";
import styleFactory from "./styles";
import { ItemColSeparator, ItemRowSeparator } from "../shared";
import Column from "../column";

const SecondaryTwoNoPicAndTwoSlice = ({
  breakpoint,
  renderSecondary1,
  renderSecondary2,
  renderSupport1,
  renderSupport2
}) => {
  const styles = styleFactory(breakpoint);

  if (breakpoint === editionBreakpoints.small) {
    return (
      <Column
        tiles={[
          renderSecondary1,
          renderSecondary2,
          renderSupport1,
          renderSupport2
        ]}
      />
    );
  }

  if (breakpoint === editionBreakpoints.medium) {
    return (
      <Fragment>
        <View style={styles.itemContainer}>
          <View key={renderSecondary1().props.id} style={styles.item}>
            {renderSecondary1()}
          </View>
          <ItemColSeparator />
          <View key={renderSecondary2().props.id} style={styles.item}>
            {renderSecondary2()}
          </View>
        </View>
        <ItemRowSeparator />
        <View style={styles.itemContainer}>
          <View key={renderSupport1().props.id} style={styles.item}>
            {renderSupport1()}
          </View>
          <ItemColSeparator />
          <View key={renderSupport2().props.id} style={styles.item}>
            {renderSupport2()}
          </View>
        </View>
      </Fragment>
    );
  }

  return (
    <View style={styles.container}>
      <Column
        style={styles.secondaryItemContainer}
        tiles={[renderSecondary1]}
      />
      <ItemColSeparator />
      <Column style={styles.supportItemContainer} tiles={[renderSupport1]} />
      <ItemColSeparator />
      <Column
        style={styles.secondaryItemContainer}
        tiles={[renderSecondary2]}
      />
      <ItemColSeparator />
      <Column style={styles.supportItemContainer} tiles={[renderSupport2]} />
    </View>
  );
};

SecondaryTwoNoPicAndTwoSlice.propTypes = propTypes;

export default SecondaryTwoNoPicAndTwoSlice;
