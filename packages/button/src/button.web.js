import React from "react";
import transformTitle from "./utils";
import { propTypes, defaultProps } from "./button-prop-types";
import styles from "./styles";

const Button = ({ fontSize, lineHeight, onPress, style, title }) => {
  const transformedTitle = transformTitle(title);
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
      {transformedTitle}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
