import styled from 'styled-components';
import { colours, fonts } from '@times-components/styleguide';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: red 1px solid;
  padding: 10px;
`;

export const TimeSinceUpdate = styled.div`
  color: ${colours.functional.primary};
  font-family: ${fonts.supporting};
  font-size: 12px;
  line-height: 16px;
`;
