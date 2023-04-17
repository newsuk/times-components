import styled from 'styled-components';
import { colours, fonts } from '@times-components/ts-styleguide';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 0 8px;
`;

export const TimeSinceUpdate = styled.div<{ color?: string }>`
  color: ${({ color }) => color || colours.functional.primary};
  font-family: ${fonts.supporting};
  font-size: 14px;
  line-height: 16px;
`;
