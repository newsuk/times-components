import styled from 'styled-components';
import { breakpoints, fonts } from '@times-components/styleguide';

export const PlaceholderContainer = styled.div`
  position: relative;
  height: 200px;
  margin: 0 auto 20px auto;

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;

export const Label = styled.div<{ sectionColour: string }>`
  font-family: ${fonts.supporting};
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  color: ${({ sectionColour }) => `${sectionColour}`};
  padding-bottom: 10px;
  letter-spacing: 1px;

  @media (min-width: ${breakpoints.medium}px) {
    padding-bottom: 6px;
  }

  @media (min-width: ${breakpoints.wide}px) {
    padding-bottom: 10px;
  }
`;

export const HiddenDiv = styled.div`
  display: none;
`;
