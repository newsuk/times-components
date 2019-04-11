import React from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import { ItemColSeparator } from "../shared";
import { propTypes, defaultProps } from "./proptypes";
import styleFactory from "./styles";
import VerticalLayout from "../verticallayout";

const LeadTwoNoPicAndTwoSlice = ({
  breakpoint,
  lead1,
  lead2,
  support1,
  support2
}) => {
  const styles = styleFactory(breakpoint);

  if (breakpoint === editionBreakpoints.huge) {
    return (
      <View style={styles.container}>
        <VerticalLayout style={styles.column} tiles={[lead1, lead2]} />
        <ItemColSeparator />
        <View style={styles.middleTile}>{support1}</View>
        <ItemColSeparator />
        <View style={styles.column}>{support2}</View>
      </View>
    );
  }

  if (breakpoint === editionBreakpoints.wide) {
    return (
      <View style={styles.container}>
        <VerticalLayout style={styles.column} tiles={[lead1, lead2]} />
        <ItemColSeparator />
        <View style={styles.middleTile}>{support1}</View>
        <ItemColSeparator />
        <View style={styles.column}>{support2}</View>
      </View>
    );
  }

  if (breakpoint === editionBreakpoints.small) {
    return <VerticalLayout tiles={[lead1, lead2, support1, support2]} />;
  }

  return (
    <View style={styles.container}>
      <VerticalLayout style={styles.column} tiles={[lead1, lead2]} />
      <ItemColSeparator />
      <VerticalLayout style={styles.column} tiles={[support1, support2]} />
    </View>
  );
};

LeadTwoNoPicAndTwoSlice.propTypes = propTypes;
LeadTwoNoPicAndTwoSlice.defaultProps = defaultProps;

export default LeadTwoNoPicAndTwoSlice;
