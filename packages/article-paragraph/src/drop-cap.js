import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { ResponsiveContext } from "@times-components/responsive";
import styleFactory from "./styles";
import { propTypes, defaultProps } from "./drop-cap-prop-types";

const DropCap = props => {
  const { colour, dropCap, font, scale } = props;
  const stylesThemedAndScaled = styleFactory(font, scale);

  return (
    <Text
      selectable
      style={[
        stylesThemedAndScaled.dropCapTextElement,
        {
          color: colour
        }
      ]}
    >
      {dropCap}
    </Text>
  );
};

DropCap.propTypes = {
  ...propTypes,
  dropCap: PropTypes.string.isRequired,
  scale: PropTypes.string.isRequired
};

DropCap.defaultProps = defaultProps;

export default props => (
  <ResponsiveContext.Consumer>
    {({ isTablet }) => <DropCap {...props} isTablet={isTablet} />}
  </ResponsiveContext.Consumer>
);
