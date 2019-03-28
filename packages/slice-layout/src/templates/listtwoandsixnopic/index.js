import React, { Fragment } from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import styleFactory from "./styles";
import Column from "../column";
import { ItemRowSeparator, ItemColSeparator } from "../shared";
import propTypes from "./proptypes";

const ListTwoAndSixNoPic = ({
  breakpoint,
  children: [lead1, lead2, ...supports]
}) => {
  const styles = styleFactory(breakpoint);

  if (breakpoint === editionBreakpoints.small) {
    return (
      <Fragment>
        <View style={styles.leadContainer}>
          <View key={lead1.props.id} style={styles.leadItem}>
            {lead1}
          </View>
          <ItemColSeparator />
          <View key={lead2.props.id} style={styles.leadItem}>
            {lead2}
          </View>
        </View>
        <ItemRowSeparator />
        <Column>{supports}</Column>
      </Fragment>
    );
  }

  const supportItemsOne = supports.slice(0, 3);
  const supportItemsTwo = supports.slice(3);
  return (
    <View style={styles.container}>
      <View key={lead1.props.id} style={styles.rowItemContainer}>
        {lead1}
      </View>
      <ItemColSeparator />
      <View key={lead2.props.id} style={styles.rowItemContainer}>
        {lead2}
      </View>
      <ItemColSeparator />
      <View style={styles.rowItemContainer}>
        {supportItemsOne.map((item, index) => (
          <View key={item.props.id}>
            {item}
            {supportItemsOne.length - 1 > index ? <ItemRowSeparator /> : null}
          </View>
        ))}
      </View>
      <ItemColSeparator />
      <View style={styles.rowItemContainer}>
        {supportItemsTwo.map((item, index) => (
          <View key={item.props.id}>
            {item}
            {supportItemsTwo.length - 1 > index ? <ItemRowSeparator /> : null}
          </View>
        ))}
      </View>
    </View>
  );
};

ListTwoAndSixNoPic.propTypes = propTypes;

export default ListTwoAndSixNoPic;
