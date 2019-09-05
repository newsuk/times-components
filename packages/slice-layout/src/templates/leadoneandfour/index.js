import React, { Fragment } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { editionBreakpoints } from "@times-components/styleguide";
import { ItemColSeparator } from "../shared";
import VerticalLayout from "../verticallayout";
import stylesFactory from "./styles";

const leadOneAndFourSlice = ({
  breakpoint,
  lead,
  support1,
  support2,
  support3,
  support4
}) => {
  const styles = stylesFactory(breakpoint);
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

leadOneAndFourSlice.propTypes = {
  breakpoint: PropTypes.string,
  lead: PropTypes.node.isRequired,
  support1: PropTypes.node.isRequired,
  support2: PropTypes.node.isRequired,
  support3: PropTypes.node.isRequired,
  support4: PropTypes.node.isRequired
};

leadOneAndFourSlice.defaultProps = {
  breakpoint: editionBreakpoints.small
};

export default leadOneAndFourSlice;
