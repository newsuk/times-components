import styled from 'styled-components';

import {
  breakpoints,
  colours,
  fonts,
  spacing
} from '@times-components/ts-styleguide';

export const View = styled.div`
  align-items: stretch;
  box-sizing: border-box;
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0;
  min-height: 0;
  min-width: 0;
  padding: 0;
  position: relative;
  z-index: 0;
`;

export const Text = styled.div`
  border: 0 solid black;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 1);
  display: inline;
  font-size: 14px;
  font-family: sans-serif;
  margin: 0;
  padding: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const InpContainer = styled(View)<{ section?: string }>`
  border-top: 2px solid
    ${({ section }) => (section ? colours.section[section] : 'black')};
  display: flex;
  flex-direction: column;
  margin-right: ${spacing(2)};
  margin-bottom: ${spacing(4)};
  margin-left: ${spacing(2)};
  height: 157.5px;

  @media (min-width: ${breakpoints.medium}px) {
    margin: 0 auto ${spacing(4)};
    width: 80.8%;
    height: 157.5px;
  }
  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
    height: 117.5px;
  }
`;

export const InpPreferencesText = styled(Text)`
  color: ${colours.functional.action};
  font-family: ${fonts.body};
  font-size: 18px;
  text-align: left;
  letter-spacing: -0.4px;
  margin-bottom: ${spacing(3)};

  @media (min-width: ${breakpoints.wide}px) {
    display: block;
  }
`;
