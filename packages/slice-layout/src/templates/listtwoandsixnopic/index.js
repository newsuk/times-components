import React, { Fragment } from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import styleFactory from "./styles";
import { ItemRowSeparator, ItemColSeparator } from "../shared";
import HorizontalLayout from "../horizontallayout";
import propTypes from "./proptypes";
import VerticalLayout from "../verticallayout";

const ListTwoAndSixNoPic = ({
  breakpoint,
  lead1,
  lead2,
  support1,
  support2,
  support3,
  support4,
  support5,
  support6
}) => {
  const styles = styleFactory(breakpoint);
  const supportItems = [
    support1,
    support2,
    support3,
    support4,
    support5,
    support6
  ];

  if (breakpoint === editionBreakpoints.small) {
    return (
      <Fragment>
        <HorizontalLayout
          containerStyle={styles.leadContainer}
          tiles={[
            { style: styles.leadItem, tile: lead1 },
            { style: styles.leadItem, tile: lead2 }
          ]}
        />
        <ItemRowSeparator />
        <VerticalLayout tiles={supportItems} />
      </Fragment>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.rowItemContainer}>{lead1}</View>
      <ItemColSeparator />
      <View style={styles.rowItemContainer}>{lead2}</View>
      <ItemColSeparator />
      <View style={styles.supportsWrapper}>
        <HorizontalLayout
          containerStyle={styles.supportContainer}
          tiles={[
            { style: styles.supportItem, tile: support1 },
            { style: styles.supportItem, tile: support2 }
          ]}
        />
        <ItemRowSeparator />
        <HorizontalLayout
          containerStyle={styles.supportContainer}
          tiles={[
            { style: styles.supportItem, tile: support3 },
            { style: styles.supportItem, tile: support4 }
          ]}
        />
        <ItemRowSeparator />
        <HorizontalLayout
          containerStyle={styles.supportContainer}
          tiles={[
            { style: styles.supportItem, tile: support5 },
            { style: styles.supportItem, tile: support6 }
          ]}
        />
      </View>
    </View>
  );
};

ListTwoAndSixNoPic.propTypes = propTypes;

export default ListTwoAndSixNoPic;
