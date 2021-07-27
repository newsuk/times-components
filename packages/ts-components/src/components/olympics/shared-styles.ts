import styled from 'styled-components';
import { colours, fonts } from '@times-components/styleguide';

const highlightColour = '#e4e4e4';
export const HeadingContainer = styled.h2`
  background: ${colours.functional.backgroundPrimary};
  padding: 20px 0;
  text-align: center;
  margin: 0px;
`;

export const Heading = styled.div<{ sectionColour: string }>`
  font-size: 12px;
  line-height: 14px;
  color: ${({ sectionColour }) => sectionColour};
  font-family: ${fonts.supporting};
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const Button = styled.button`
  font-family: ${fonts.supporting};
  font-size: 14px;
  line-height: 20px;
  padding: 14px 16px;
  border: 1px solid ${colours.functional.keyline};

  top: -80px;
  position: relative;

  cursor: pointer;

  &:hover {
    background-color: ${highlightColour};
  }
`;
