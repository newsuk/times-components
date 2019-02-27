import React, { Fragment } from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import styleFactory from "./styles";
import { ItemRowSeparator, ItemColSeparator } from "../shared";
import propTypes from "./proptypes";

const ListTwoAndSixNoPic = ({
  breakpoint,
  renderLead1,
  renderLead2,
  renderSupport1,
  renderSupport2,
  renderSupport3,
  renderSupport4,
  renderSupport5,
  renderSupport6
}) => {
  const styles = styleFactory(breakpoint);
  const supportItems = [
    renderSupport1,
    renderSupport2,
    renderSupport3,
    renderSupport4,
    renderSupport5,
    renderSupport6
  ];

  const renderRowItem1 = renderLead1();
  const renderRowItem2 = renderLead2();

  if (breakpoint === editionBreakpoints.small) {
    return (
      <Fragment>
        <View style={styles.leadContainer}>
          <View key={renderRowItem1.props.id} style={styles.leadItem}>
            {renderRowItem1}
          </View>
          <ItemColSeparator />
          <View key={renderRowItem2.props.id} style={styles.leadItem}>
            {renderRowItem2}
          </View>
        </View>
        <ItemRowSeparator />
        {supportItems.map((item, index) => (
          <View key={item().props.id}>
            {item()}
            {supportItems.length - 1 > index ? <ItemRowSeparator /> : null}
          </View>
        ))}
      </Fragment>
    );
  }

  const supportItemsOne = supportItems.slice(0, 3);
  const supportItemsTwo = supportItems.slice(3);
  return (
    <View style={styles.container}>
      <View key={renderRowItem1.props.id} style={styles.rowItemContainer}>
        {renderRowItem1}
      </View>
      <ItemColSeparator />
      <View key={renderRowItem2.props.id} style={styles.rowItemContainer}>
        {renderRowItem2}
      </View>
      <ItemColSeparator />
      <View style={styles.rowItemContainer}>
        {supportItemsOne.map((item, index) => (
          <View key={item().props.id}>
            {item()}
            {supportItemsOne.length - 1 > index ? <ItemRowSeparator /> : null}
          </View>
        ))}
      </View>
      <ItemColSeparator />
      <View style={styles.rowItemContainer}>
        {supportItemsTwo.map((item, index) => (
          <View key={item().props.id}>
            {item()}
            {supportItemsTwo.length - 1 > index ? <ItemRowSeparator /> : null}
          </View>
        ))}
      </View>
    </View>
  );
};

ListTwoAndSixNoPic.propTypes = propTypes;

export default ListTwoAndSixNoPic;
