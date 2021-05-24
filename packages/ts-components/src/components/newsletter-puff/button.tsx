import React from 'react';
import { capitalise } from '@times-components/utils';

import styleguide from '@times-components/styleguide';

const { colours, fontFactory } = styleguide();

const styles = {
  button: {
    ...fontFactory({
      font: 'supporting',
      fontSize: 'button'
    }),
    alignItems: 'center',
    backgroundColor: colours.functional.action,
    borderRadius: 2,
    color: colours.functional.white,
    cursor: 'pointer',
    height: 45,
    justifyContent: 'center',
    lineHeight: 0,
    minWidth: 100,
    paddingTop: 4,
    width: 160
  }
};

type ButtonProps = {
  fontSize?: number;
  lineHeight?: number;
  onPress?: () => void;
  style?: {};
  title?: string;
  textStyle?: {};
  underlayColor?: string;
};

const Button = ({
  fontSize,
  lineHeight,
  onPress,
  style,
  title = 'Submit'
}: ButtonProps) => {
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

export default Button;
