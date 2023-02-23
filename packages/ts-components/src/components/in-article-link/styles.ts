import styled from 'styled-components';
import { colours, fonts } from '@times-components/ts-styleguide';

export const Link = styled.a`
  display: flex;
  flex-direction: row;
  margin-top: 16px;
  color: #bf0000;

  fill: #bf0000;

  :hover {
    color: ${colours.functional.secondary};
    fill: ${colours.functional.secondary};
  }
`;

export const LinkText = styled.div`
  margin-top: 1px;
  margin-right: 12px;
  font-family: ${fonts.supporting};
  font-size: 15px;
`;
