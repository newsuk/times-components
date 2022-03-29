import styled from 'styled-components';
import { colours, fonts } from '@times-components/styleguide';
import { gqlRgbaToStyle } from "@times-components/utils";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3px 0 0 8px;
`;

export const TimeSinceUpdate = styled.div<{color?: string}>`
  color: ${({ color }) => gqlRgbaToStyle(color) || colours.functional.primary};
  font-family: ${fonts.supporting};
  font-size: 12px;
  line-height: 16px;
`;
