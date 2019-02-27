import React from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import styles from "./styles";
import { defaultProps, propTypes } from "./proptypes";
import { ItemRowSeparator, ItemColSeparator } from "../shared";

const leadOneAndFourSlice = ({
  breakpoint,
  renderLead,
  renderSupport1,
  renderSupport2,
  renderSupport3,
  renderSupport4
}) => {
  const { container, leadContainer, supportContainer } = styles;

  if (editionBreakpoints.small === breakpoint) {
    return (
      <View>
        {renderLead()}
        {renderSupport1()}
        <ItemRowSeparator />
        {renderSupport2()}
        <ItemRowSeparator />
        {renderSupport3()}
        <ItemRowSeparator />
        {renderSupport4()}
      </View>
    );
  }

  return (
    <View style={container}>
      <View style={leadContainer}>{renderLead()}</View>
      <ItemColSeparator />
      <View style={supportContainer}>
        {renderSupport1()}
        <ItemRowSeparator />
        {renderSupport2()}
        <ItemRowSeparator />
        {renderSupport3()}
        <ItemRowSeparator />
        {renderSupport4()}
      </View>
    </View>
  );
};

leadOneAndFourSlice.propTypes = propTypes;
leadOneAndFourSlice.defaultProps = defaultProps;

export default leadOneAndFourSlice;
