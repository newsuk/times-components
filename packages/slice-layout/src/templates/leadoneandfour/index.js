import React, { Fragment } from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import { defaultProps, propTypes } from "./proptypes";
import { ItemColSeparator } from "../shared";
import Column from "../column";
import styles from "./styles";

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
      <Fragment>
        {renderLead()}
        <Column
          tiles={[
            renderSupport1,
            renderSupport2,
            renderSupport3,
            renderSupport4
          ]}
        />
      </Fragment>
    );
  }

  return (
    <View style={container}>
      <View style={leadContainer}>{renderLead()}</View>
      <ItemColSeparator />
      <Column
        style={supportContainer}
        tiles={[renderSupport1, renderSupport2, renderSupport3, renderSupport4]}
      />
    </View>
  );
};

leadOneAndFourSlice.propTypes = propTypes;
leadOneAndFourSlice.defaultProps = defaultProps;

export default leadOneAndFourSlice;
