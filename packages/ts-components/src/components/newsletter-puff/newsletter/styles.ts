import styled from 'styled-components';

import {
  breakpoints,
  colours,
  fonts,
  spacing
} from '@times-components/ts-styleguide';

import { View, Text } from '../styles';

export const InpSubscribedContainer = styled(View)`
  justify-content: center;
  padding: 12px 16px;
  @media (min-width: ${breakpoints.small}px) {
    padding-right: 150px;
    flex: 1;
  }
`;

export const InpSignupContainer = styled(View)`
  justify-content: center;
  padding: 12px 16px;
  @media (min-width: ${breakpoints.wide}px) {
    padding: 16px 10px;
    flex: 1;
  }
`;

export const InpSignupHeadline = styled(Text)`
  color: ${colours.functional.brandColour};
  font-family: ${fonts.headline};
  text-align: center;
  font-size: 18px;
  text-decoration: none;
  margin-bottom: ${spacing(1)};
`;

export const InpCopy = styled(Text)`
  font-family: ${fonts.body};
  font-size: 18px;
  text-align: left;
  letter-spacing: -0.5px;
  color: ${colours.functional.primary};
  margin-bottom: ${spacing(6)};
  line-height: 26px;
`;

export const InpSignupCTAContainer = styled(View)<{ childStyle: any }>`
  display: ${({ childStyle }) => (childStyle === 'link' ? 'none' : 'block')};
  @media (min-width: ${breakpoints.medium}px) {
    width: ${({ childStyle }) => childStyle === 'button' && '220px'};
    margin: 0px auto;
  }

  @media (min-width: ${breakpoints.wide}px) {
    display: ${({ childStyle }) =>
      childStyle === 'link' ? 'inline-block' : 'none'};
  }
`;

export const InpPreferencesContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
`;
