import styled from 'styled-components';
import { colours, fonts } from '@times-components/ts-styleguide';

export const DateTime = styled.p`
  margin: 8px 0 0 0;
  color: ${colours.functional.secondary};
  font-size: 13px;
  line-height: 16px;
  font-family: ${fonts.supporting};
`;

export const Byline = styled.p`
  margin: 8px 0 0 0;
  color: ${colours.functional.brandColour};
  font-size: 13px;
  line-height: 16px;
  font-family: ${fonts.supporting};
`;
