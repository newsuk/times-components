import React, { Fragment } from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import { defaultProps, propTypes } from "./proptypes";
import { ItemColSeparator } from "../shared";
import VerticalLayout from "../verticallayout";
import styles from "./styles";

const leadOneAndFourSlice = ({
  breakpoint,
  lead,
  support1,
  support2,
  support3,
  support4
}) => {
  const { container, leadContainer, supportContainer } = styles;

  if (editionBreakpoints.small === breakpoint) {
    return (
      <Fragment>
        {lead}
        <VerticalLayout tiles={[support1, support2, support3, support4]} />
      </Fragment>
    );
  }

  return (
    <View style={container}>
      <View style={leadContainer}>{lead}</View>
      <ItemColSeparator />
      <VerticalLayout
        style={supportContainer}
        tiles={[support1, support2, support3, support4]}
      />
    </View>
  );
};

leadOneAndFourSlice.propTypes = propTypes;
leadOneAndFourSlice.defaultProps = defaultProps;

export default leadOneAndFourSlice;
