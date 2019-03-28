import React, { Fragment } from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import { defaultProps, propTypes } from "./proptypes";
import { ItemColSeparator } from "../shared";
import Column from "../column";
import styles from "./styles";

const leadOneAndFourSlice = ({ breakpoint, children: [lead, ...supports] }) => {
  const { container, leadContainer, supportContainer } = styles;

  if (editionBreakpoints.small === breakpoint) {
    return (
      <Fragment>
        {lead}
        <Column>{supports}</Column>
      </Fragment>
    );
  }

  return (
    <View style={container}>
      <View style={leadContainer}>{lead}</View>
      <ItemColSeparator />
      <Column style={supportContainer}>{supports}</Column>
    </View>
  );
};

leadOneAndFourSlice.propTypes = propTypes;
leadOneAndFourSlice.defaultProps = defaultProps;

export default leadOneAndFourSlice;
