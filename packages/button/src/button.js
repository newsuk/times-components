import React from "react";
import { capitalise } from "@times-components/utils";
import { propTypes, defaultProps } from "./button-prop-types";
import styles from "./styles";

const Button = ({ fontSize, lineHeight, onPress, style, title }) => {
  const fontSizeStyle = fontSize ? { fontSize } : null;
  const lineHeightStyle = lineHeight ? { lineHeight } : null;
  const buttonStyles = {
    ...styles.button,
    ...style,
    ...fontSizeStyle,
    ...lineHeightStyle
  };

  return (
    <button onClick={onPress} style={buttonStyles} type="button">
      {capitalise(title)}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
