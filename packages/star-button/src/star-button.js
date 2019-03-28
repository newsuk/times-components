import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";
import { IconStar } from "@times-components/icons";

class StarButton extends Component {
  constructor(props) {
    super(props);

    const stars = {
      default: {
        fillColour: "none",
        opacity: "1",
        strokeColour: colours.functional.secondary
      },
      disabled: {
        fillColour: "none",
        opacity: "0.4",
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
    const { height, onPress } = this.props;
    const { star: { fillColour, opacity, strokeColour } } = this.state;
    const disabled = this.props.starState === 'disabled';
    
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled}>
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
  starState: PropTypes.oneOf(["default", "disabled", "selected"])
};

StarButton.defaultProps = {
  height: 18,
  starState: "default"
};

export default StarButton;
