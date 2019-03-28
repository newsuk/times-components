import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";
import { IconStar } from "@times-components/icons";

const starStates = {
  disabled: "disabled",
  initial: "initial",
  selected: "selected"
};

class StarButton extends Component {
  constructor(props) {
    super(props);

    const stars = {
      disabled: {
        fillColour: "none",
        opacity: "0.4",
        strokeColour: colours.functional.secondary
      },
      initial: {
        fillColour: "none",
        opacity: "1",
        strokeColour: colours.functional.secondary
      },
      selected: {
        fillColour: colours.functional.action,
        opacity: "1",
        strokeColour: "none"
      }
    };

    this.state = { star: stars[props.starState] };
  }

  render() {
    const { height, onPress, starState } = this.props;
    const { star: { fillColour, opacity, strokeColour } } = this.state;
    const disabled = starState === starStates.disabled;

    return (
      <TouchableOpacity disabled={disabled} onPress={onPress}>
        <IconStar
          fillColour={fillColour}
          height={height}
          opacity={opacity}
          strokeColour={strokeColour}
        />
      </TouchableOpacity>
    );
  }
}

StarButton.propTypes = {
  height: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  starState: PropTypes.oneOf(Object.keys(starStates))
};

StarButton.defaultProps = {
  height: 18,
  starState: starStates.initial
};

export { starStates };
export default StarButton;
