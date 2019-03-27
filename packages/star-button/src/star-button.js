import React from "react";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";
import { IconStar } from "@times-components/icons";

const StarButton = ({ onPress, height = 18 }) => {
  const fillColour = 'none';
  const strokeColour = colours.functional.secondary;

  return (
    <TouchableOpacity onPress={onPress}>
      <IconStar height={height} fillColour={fillColour} strokeColour={strokeColour} />
    </TouchableOpacity>
  );
}


StarButton.propTypes = {
  height: PropTypes.number,
  onPress: PropTypes.func.isRequired,
};

export default StarButton;
