import styled from 'styled-components';

import { colours, fonts } from '@times-components/ts-styleguide';

export const PuffButton = styled.button`
  font-family: Roboto-Regular;
  font-size: 16px;
  line-height: 0;
  align-items: center;
  background-color: transparent;
  border-radius: 0px;
  color: rgb(29, 29, 27);
  cursor: pointer;
  height: 48px;
  justify-content: center;
  min-width: 100px;
  padding-top: 4px;
  width: 100%;
  border-color: rgb(29, 29, 27);
  border-width: 1px;
  letter-spacing: 0.2px;

  &:hover {
    background-color: #e4e4e4;
  }

  &:active {
    background-color: #cccccc;
  }
`;

export const PuffLinkButton = styled.button`
  color: ${colours.functional.action};
  font-family: ${fonts.body};
  font-size: 18px;
  text-align: left;
  letter-spacing: -0.4px;
  border: none;
  background-color: white;
  text-decoration-line: underline;

  &:hover {
    text-decoration-line: none;
  }
`;
