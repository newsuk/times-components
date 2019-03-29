import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "@times-components/link";
import { IconStar } from "@times-components/icons";
import stars from "./styles";

const starStates = {
  disabled: "disabled",
  initial: "initial",
  selected: "selected"
};

class StarButton extends Component {
  constructor(props) {
    super(props);
    this.state = { star: stars[props.starState] };
  }

  render() {
    const { height, onPress, starState } = this.props;
    const {
      star: { fillColour, opacity, strokeColour }
    } = this.state;
    const disabled = starState === starStates.disabled;

    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link disabled={disabled} onPress={onPress}>
        <IconStar
          fillColour={fillColour}
          height={height}
          opacity={opacity}
          strokeColour={strokeColour}
        />
      </Link>
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
