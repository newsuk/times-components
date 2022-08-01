import styled from 'styled-components';
import { colours, fonts } from '@times-components/ts-styleguide';

export const Header = styled.div`
  margin-bottom: 12px;
  padding: 16px 12px 12px 12px;
  color: ${colours.functional.brandColour};
  font-family: ${fonts.headline};
  font-size: 24px;
  line-height: 24px;
  font-weight: normal;
  text-align: center;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
`;
