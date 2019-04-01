import React from "react";
import PropTypes from "prop-types";
import Link from "@times-components/link";
import { IconStar } from "@times-components/icons";
import stars from "./styles";

const StarButton = ({ disabled, height, onPress, selected }) => {
  const starState =
    (disabled && "disabled") || (selected && "selected") || "initial";
  const { fillColour, opacity, strokeColour } = stars[starState];

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
};

StarButton.propTypes = {
  disabled: PropTypes.bool,
  height: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  selected: PropTypes.bool
};

StarButton.defaultProps = {
  disabled: false,
  height: 18,
  selected: false
};

export default StarButton;
