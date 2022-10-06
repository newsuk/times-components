import styled from 'styled-components';

import {
  breakpoints,
  colours,
  fonts,
  spacing
} from '@times-components/ts-styleguide';

import Button from '@times-components/button';

export const buttonStyles = {
  alignItems: 'center',
  backgroundColor: 'transparent',
  borderColor: colours.functional.brandColour,
  borderStyle: 'thin',
  borderWidth: 1,
  color: colours.functional.brandColour,
  elevation: 0,
  fontFamily: fonts.supporting,
  height: 48,
  justifyContent: 'center',
  letterSpacing: 0.2,
  width: '100%'
};

export const LinkButton = styled.button`
  display: none;
  color: ${colours.functional.action};

  font-family: ${fonts.body};
  font-size: 18px;
  text-align: left;
  letter-spacing: -0.4px;
  border: none;
  background-color: white;
  margin-bottom: ${spacing(6)};

  @media (min-width: ${breakpoints.wide}px) {
    display: block;
  }
`;

export const PuffButton = styled(Button)`
  @media (min-width: ${breakpoints.wide}px) {
    display: none;
  }
`;
